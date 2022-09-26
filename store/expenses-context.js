import { createContext, useState } from "react";


const ExpensesContext = createContext({
  expenses: null, // { name, amount, type, date }
  sum: {},
  getAllExpenses: function () {},
  deleteExpense: function () {},
  sumCalculate: function () {},
  addExpense: function() {}
});

export function ExpensesContextProvider(props) {
  const [expenses, setExpenses] = useState([]);
  const [sum, setSum] = useState({
    HUF: 0,
    EUR: 0,
    USD: 0,
    GBP: 0,
  });

  function getAllExpensesHandler(data) {
    setExpenses(data);
  }

  function addExpenseHandler(data) {
    
    setExpenses(prev => {
        return [ { name: data.name, amount: data.amount, type: data.type, date: data.date, _id: new Date(Date.now()).toISOString() } , ...prev]
    })
  }

  function deleteExpenseHandler(id) {
    setExpenses((prev) => prev.filter((item) => item._id !== id));
  }

  function sumCalculateHandler(activeCurency, rates) {


    const expensesObj = expenses.filter(item => item.type === 'expense') 
    const expArr = expensesObj.map(item => parseFloat(item.amount * (-1)))
    const expSum = expArr.reduce((total, num) => (total + num), 0)

    const incomesObj = expenses.filter(item => item.type === 'income') 
    const incArr = incomesObj.map(item => parseFloat(item.amount))
    const incSum = incArr.reduce((total, num) => (total + num), 0)

    const sumHUF = parseFloat(incSum + expSum).toFixed(2)
    const sumEUR = parseFloat(sumHUF * rates.EUR).toFixed(2)
    const sumUSD = parseFloat(sumHUF * rates.USD).toFixed(2)
    const sumGBP = parseFloat(sumHUF * rates.GBP).toFixed(2)
    setSum({HUF: sumHUF, EUR: sumEUR, USD: sumUSD, GBP: sumGBP})
  }

  const context = {
    expenses: expenses,
    sum: sum,
    getAllExpenses: getAllExpensesHandler,
    deleteExpense: deleteExpenseHandler,
    sumCalculate: sumCalculateHandler,
    addExpense: addExpenseHandler
  };

  return (
    <ExpensesContext.Provider value={context}>
      {props.children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContext;
