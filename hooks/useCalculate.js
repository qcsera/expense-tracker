import { useEffect, useState, useContext } from 'react'

import CurrencyContext from  '../store/currency-context'

const useCalculate = (amount, currency='HUF', rates) => {
    const currencyCtx = useContext(CurrencyContext)
    const activeCurrency = currencyCtx.activeCurrency

    const [calculatedAmounts, setCalculatedAmounts] = useState({
        HUF: 1,
        EUR: 1, 
        USD: 1,
        GBP: 1
    })
    
    useEffect(() => {
        function calculate() {
            switch(activeCurrency) {
                case 'HUF': {
                    const EUR = amount * rates.EUR
                    const USD = amount * rates.USD
                    const GBP = amount * rates.GBP
                    setCalculatedAmounts(previousState => {
                        return { ...previousState, EUR:EUR, USD:USD, GBP:GBP }
                    })
                    
                    // setCalculatedAmounts({HUF: 1, EUR:EUR, USD:USD, GBP:GBP})
                }
                case 'EUR': {
                    const HUF = amount * rates.HUF
                    const USD = amount * rates.USD
                    const GBP = amount * rates.GBP
                    setCalculatedAmounts(previousState => {
                        return{ ...previousState, HUF:HUF, USD:USD, GBP:GBP }
                    })
                    // setCalculatedAmounts({EUR: 1, HUF:HUF, USD:USD, GBP:GBP})
                }
                case 'USD': {
                    const HUF = amount * rates.HUF
                    const EUR = amount * rates.EUR
                    const GBP = amount * rates.GBP
                    setCalculatedAmounts(previousState => {
                        return { ...previousState, HUF:HUF, EUR:EUR, GBP:GBP }
                    })
                    // setCalculatedAmounts({USD: 1, HUF:HUF, EUR:EUR, GBP:GBP })
                }
                case 'GBP': {
                    const HUF = amount * rates.HUF
                    const EUR = amount * rates.EUR
                    const USD = amount * rates.USD
                    setCalculatedAmounts(previousState => {
                        return { ...previousState, HUF:HUF, EUR:EUR, USD:USD }
                    })
                    // setCalculatedAmounts({GBP: 1, HUF:HUF, EUR:EUR, USD:USD })
                }
        
                default:
                    return calculatedAmounts
            }
        }

        calculate()

    },[amount, activeCurrency, rates.HUF, rates.EUR, rates.USD, rates.GBP])
    

    return [calculatedAmounts]
}

export default useCalculate