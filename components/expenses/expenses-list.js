import React, { useEffect, useState, useContext } from "react";

import ExpenseItem from "./expense-item";
import styles from "./expenses-list.module.css";

import ExpensesContext from "../../store/expenses-context";

const ExpensesList = () => {
  // const [expenses, setExpenses] = useState([])
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/expense");
      const jsonExpenses = await res.json();
      expensesCtx.getAllExpenses(jsonExpenses.transactions);
    };
    fetchData();
  }, []);

  const expenses = expensesCtx.expenses;

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {expenses &&
          expenses.map((item) => <ExpenseItem key={item._id} item={item} />)}
      </ul>
    </section>
  );
};

export default ExpensesList;
