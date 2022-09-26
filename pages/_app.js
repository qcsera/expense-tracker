import Layout from "../components/layout/layout";
import { Provider } from "next-auth/client";
import { ExpensesContextProvider } from "../store/expenses-context";
import { CurrencyContextProvider } from "../store/currency-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
    <CurrencyContextProvider>
      <ExpensesContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ExpensesContextProvider>
    </CurrencyContextProvider>
    </Provider>
  );
}

export default MyApp;
