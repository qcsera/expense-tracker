import React, { useContext } from "react";
import DeleteIcon from "../ui/DeleteIcon";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import styles from "./expense-item.module.css";

import ExpensesContext from "../../store/expenses-context";
import CurrencyContext from "../../store/currency-context";

import useCalculate from '../../hooks/useCalculate'
import { formatDate } from '../../utils/formatDate'


const ExpenseItem = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const expensesCtx = useContext(ExpensesContext);
  const currencyCtx = useContext(CurrencyContext);

  const activeCurrency = currencyCtx.activeCurrency
  const rates = currencyCtx.rates

  const [calculatedAmounts] = useCalculate(item.amount, activeCurrency, rates)
  

  const handleDelete = (id) => {
    fetch("/api/expense", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expensesCtx.deleteExpense(id);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <li
      className={`${styles.item} ${
        item.type == "income" ? styles.positive : styles.negative
      }`}
    >
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={styles.name}
      >
        {item.name}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{item.date}</Typography>
      </Popover>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={styles.amount}
      >
        {calculatedAmounts[activeCurrency]?.toFixed(2)} {activeCurrency}
        
      </Typography>
      <div onClick={() => handleDelete(item._id)}>
        <DeleteIcon />
      </div>
    </li>
  );
};

export default ExpenseItem;
