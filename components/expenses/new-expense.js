import { useContext, useEffect, useRef, useState } from "react";
import { Button, MenuItem, TextField, Grid } from "@mui/material";
import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import styles from "./new-expense.module.css";

import CurrencyContext from "../../store/currency-context";
import ExpensesContext from "../../store/expenses-context";
import Typography from "@mui/material/Typography";

const NewExpense = () => {
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Username must not exceed 20 characters"),
    amount: Yup.number()
      .typeError("Must be a number")
      .positive()
      .required("Amount is required")
      .min(1, "Must be a positive number"),
    type: Yup.string().required("Type is required"),
  });

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const currencyCtx = useContext(CurrencyContext);
  const activeCurrency = currencyCtx.activeCurrency;

  const expensesCtx = useContext(ExpensesContext);

  // const nameRef = useRef(null);
  // const amountRef = useRef(0);
  // const typeRef = useRef("");

  let typeOptions = [
    {
      value: "income",
      label: "Income",
    },
    {
      value: "expense",
      label: "Expense",
    },
  ];

  const onSubmit = (data) => {
    // e.preventDefault();
    // const name = nameRef.current?.value;
    // const amount = amountRef.current?.value;
    // const type = typeRef.current?.value;
    let date = new Date(Date.now());
    date = date.toLocaleString();
    // const date = newDate()

    fetch("/api/expense", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        amount: data.amount,
        type: data.type,
        date: date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expensesCtx.addExpense({
      name: data.name,
      amount: data.amount,
      type: data.type,
      date,
    });
    reset();
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSubmit(onSubmit)();
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

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ minHeight: 80 }}>
            <TextField
              id="name"
              name="name"
              size="small"
              label={`Expense Name`}
              required
              {...register("name")}
              error={errors.name ? true : false}
              fullWidth
            />
            <Typography variant="inherit" color="red">
              {errors.name?.message}
            </Typography>
          </Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              id="amount"
              name="amount"
              type="number"
              size="small"
              label={`Amount in HUF`}
              required
              {...register("amount")}
              error={errors.name ? true : false}
              defaultValue={0}
              // className={styles.amount}
            />
            <Typography variant="inherit" color="red">
              {errors.amount?.message}
            </Typography>
          </Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              id="type"
              name="type"
              select
              size="small"
              label="Type"
              required
              // error={errors.name ? true : false}
              {...register("type")}
              defaultValue="income"
              fullWidth
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="inherit" color="red">
              {errors.type?.message}
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1}>
            <Button
              onClick={handleSubmit(onSubmit)}
              sx={{ maxHeight: 39 }}
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </section>
  );
};

export default NewExpense;
