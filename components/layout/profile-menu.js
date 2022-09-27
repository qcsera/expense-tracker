import React, { useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/client";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import CurrencyDollarIcon from "@mui/icons-material/AttachMoney";
import CurrencyEuroIcon from "@mui/icons-material/EuroSymbol";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./profile-menu.module.css";

import CurrencyContext from "../../store/currency-context";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ProfileMenu() {
  const [curr, setCurr] = useState("HUF");

  const currencyCtx = useContext(CurrencyContext);
  let activeCurrency = currencyCtx.activeCurrency;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (currency) => {
    setAnchorEl(null);
    if (currency || currency !== "") {
      currencyCtx.setActiveCurrency(currency);
    }
  };

  const logoutHandler = () => {
    signOut();
  };

  useEffect(() => {
    setCurr(activeCurrency);
  }, [activeCurrency]);

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        john1234
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(activeCurrency)}
      >
        {activeCurrency !== "EUR" ? (
          <MenuItem
            onClick={() => handleClose("EUR")}
            disableRipple
            // className={`${curr === "EUR" ? styles.hide : styles.show}`}
          >
            <CurrencyEuroIcon />
            EUR
          </MenuItem>
        ) : (
          ""
        )}
        {activeCurrency !== "USD" ? (
          <MenuItem
            onClick={() => handleClose("USD")}
            disableRipple
            className={`${curr !== "USD" ? styles.hide : styles.show}`}
          >
            <CurrencyDollarIcon />
            USD
          </MenuItem>
        ) : (
          ""
        )}
        {activeCurrency !== "GBP" ? (
          <MenuItem
            onClick={() => handleClose("GBP")}
            disableRipple
            className={`${curr === "GBP" ? styles.hide : styles.show}`}
          >
            <CurrencyPoundIcon />
            GBP
          </MenuItem>
        ) : (
          ""
        )}
        {activeCurrency !== "HUF" ? (
          <MenuItem
            onClick={() => handleClose("HUF")}
            disableRipple
            className={`${curr === "HUF" ? styles.hide : styles.show}`}
          >
            <span
              style={{ marginLeft: 2, marginRight: "0.9rem", color: "gray" }}
            >
              Ft
            </span>
            HUF
          </MenuItem>
        ) : (
          ""
        )}

        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={logoutHandler} disableRipple>
          <LogoutIcon />
          Logout
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
