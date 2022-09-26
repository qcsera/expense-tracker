import { createContext, useState } from "react";

const CurrencyContext = createContext({
  rates: null, 
  activeCurrency: 'HUF',
  getPriceByActiveCurrency: function () {},
  setActiveCurrency: function () {},
  setCurrencyRates: function () {}
});

export function CurrencyContextProvider(props) {
  const [rates, setRates] = useState([]);
  const [activeCurrency, setActiveCurrency] = useState('HUF');

function getPriceByActiveCurrencyHandler(activeCurrency) {
    setPrices(data);
  }
  
function setActiveCurrencyHandler(currency) {
    setActiveCurrency(currency)
  }

function setCurrancyRatesHandler(ObjOfRetes) {
    const rates ={
        HUF: ObjOfRetes.HUF, 
        EUR: ObjOfRetes.EUR, 
        USD: ObjOfRetes.USD, 
        GBP: ObjOfRetes.GBP, 
    }
    setRates(rates)
  }

  const context = {
    rates: rates,
    activeCurrency: activeCurrency,
    getPriceByActiveCurrency: getPriceByActiveCurrencyHandler,
    setActiveCurrency: setActiveCurrencyHandler,
    setCurrencyRates: setCurrancyRatesHandler

  };


  return (
    <CurrencyContext.Provider value={context}>
      {props.children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyContext;
