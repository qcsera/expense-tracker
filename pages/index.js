import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import { getSession } from "next-auth/client";
import { useSession } from "next-auth/client";
import ExpensesList from "../components/expenses/expenses-list";
import NewExpense from "../components/expenses/new-expense";
import Sum from "../components/sum";
import styles from "../styles/Home.module.css";

import CurrencyContext from "../store/currency-context";
import ExpensesContext from "../store/expenses-context";

export default function Home(props) {

  

  const currencyCtx = useContext(CurrencyContext)
  const activeCurrency = currencyCtx.activeCurrency
  const rates = currencyCtx.rates

  const expensesCtx = useContext(ExpensesContext)
  const expenses = expensesCtx.expenses


  const [session, loading] = useSession();

  

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res =  await fetch(`https://open.er-api.com/v6/latest/HUF`)
        const jsonPrices = await res.json()
        currencyCtx.setCurrencyRates(jsonPrices.rates)
        
        // expensesCtx.sumCalculate(activeCurrency, rates)
        
        
      } catch(error) {
        console.log(error)
      }
    }
    fetchRates()
  },[activeCurrency])

  useEffect(() => {
    expensesCtx.sumCalculate(activeCurrency, rates)
  },[expensesCtx.expenses, activeCurrency])

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Expense tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.main}>
        <NewExpense />
        <Sum />
        <ExpensesList />
      </section>
    </div>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
