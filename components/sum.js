import React, { useContext, useEffect } from 'react'
import styles from  './sum.module.css'

import CurrencyContext from '../store/currency-context'
import ExpensesContext from '../store/expenses-context'
import useCalculate from '../hooks/useCalculate'

const Sum = () => {
  const currencyCtx = useContext(CurrencyContext)
  const expensesCtx = useContext(ExpensesContext)
  // expensesCtx.sumCalculate()

  const activeCurrency = currencyCtx.activeCurrency
  const rates = currencyCtx.rates



  // const [ calculatedAmounts ] = useCalculate(expensesCtx.sum[activeCurrency], activeCurrency, rates)

  const calcHUF = parseFloat(expensesCtx.sum['HUF']).toFixed(2)
  const calcEUR = parseFloat(expensesCtx.sum['EUR']).toFixed(2)
  const calcUSD = parseFloat(expensesCtx.sum['USD']).toFixed(2)
  const calcGBP = parseFloat(expensesCtx.sum['GBP']).toFixed(2)
  // const calcEUR = parseFloat(calculatedAmounts.EUR).toFixed(2)
  // const calcUSD = parseFloat(calculatedAmounts.USD).toFixed(2)
  // const calcGBP = parseFloat(calculatedAmounts.GBP).toFixed(2)



  

  return (
    <section className={`${styles.container} ${expensesCtx.sum[activeCurrency] < 0 ? styles.negative : styles.positive}`}>
        <h2 className={styles.title}>Sum</h2>
        {/* // Todo: the sum color is depends on negative positive amount */}
        <h3 className={styles.sum}>{expensesCtx.sum[activeCurrency]} {activeCurrency}</h3> 
        <div className={styles.list}>
            <span className={`${styles.listItem} ${activeCurrency === 'HUF' ? styles.hide : styles.show}`}>HUF: {calcHUF}</span>
            <span className={`${styles.listItem} ${activeCurrency === 'EUR' ? styles.hide : styles.show}`}>EUR: {calcEUR}</span>
            <span className={`${styles.listItem} ${activeCurrency === 'USD' ? styles.hide : styles.show}`}>USD: {calcUSD}</span>
            <span className={`${styles.listItem} ${activeCurrency === 'GBP' ? styles.hide : styles.show}`}>GBP: {calcGBP}</span>
        </div>
    </section>
  )
}

export default Sum