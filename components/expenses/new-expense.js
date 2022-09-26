import { useContext, useEffect, useRef } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import React from "react";
import styles from "./new-expense.module.css";

import CurrencyContext from "../../store/currency-context";
import ExpensesContext from "../../store/expenses-context";

const NewExpense = () => {

  const currencyCtx = useContext(CurrencyContext)
  const activeCurrency = currencyCtx.activeCurrency

  const expensesCtx = useContext(ExpensesContext)

  const nameRef = useRef(null);
  const amountRef = useRef(0);
  const typeRef = useRef('');
  // const [type, setType] = useState([]);



  let typeOptions = [
    {
      value: 'income',
      label: 'Income',
    },
    {
      value: 'expense',
      label: 'Expense',
    },
  ];

  const sendExpenseHandler = (e) => {
    e.preventDefault()
    const name = nameRef.current?.value;
    const amount = amountRef.current?.value;
    const type = typeRef.current?.value;
    let date = new Date(Date.now())
    date = date.toLocaleString()
    // const date = newDate()



    fetch('/api/expense', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        amount: amount,
        type: type,
        date: date
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    expensesCtx.addExpense({name, amount, type, date })


  }

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        
        event.preventDefault();
        
        sendExpenseHandler(event)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <section className={styles.container}>
      <h3>New Item</h3>
      <form className={styles.form} onSubmit={sendExpenseHandler}>
        <TextField
          id="name"
          size="small"
          label="Expense Name"
          inputRef={nameRef}
          required
          className={styles.name}
          sx={{marginBottom: 3}}
        />
        <TextField
          id="amount"
          type="number"
          size="small"
          label={`Amount in HUF`}
          inputRef={amountRef}
          required
          className={styles.amount}
        />
        <TextField
          id="type"
          select
          size="small"
          label="Type"
          inputRef={typeRef}
          required
          className={styles.type}
          defaultValue='income'
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
        <Button type="submit" variant="contained">Add</Button>
      </form>
    </section>
  );
};

export default NewExpense;
