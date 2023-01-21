/** Libraries */
import React, { useState } from "react";

import PropTypes from "prop-types";

import { MenuItem, TextField, useMediaQuery, useTheme } from "@mui/material";

/** Utils */
import { colors } from "../../../../utils/colors";

// It is the component in charge of the function of selecting the type of currency within the
// form to add loads

const SelectCurrency = ({ label, form, setForm }) => {
  // We use useTheme and useMediaQuery to create the breakpoints that will help us make our component responsive.
  // that will be used to make our component responsive.

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  // We create the initial state of the currency

  const [currency, setCurrency] = useState("EUR");

  // This function is used to change the value of the selected currency.

  const handleChange = (event) => {
    setCurrency(event.target.value);
    setForm({ ...form, currency: event.target.value });
  };

  // This array shows the available currency types

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];
  return (
    <>
      <TextField
        InputProps={{ style: { marginBottom: sm || md ? 30 : 0 } }}
        id="outlined-select-currency"
        select
        label={label}
        InputLabelProps={{
          style: { color: "#fff", fontWeight: 600 },
        }}
        SelectProps={{
          style: { color: colors.white1 },
        }}
        FormHelperTextProps={{
          style: {
            color: "#fff",
            fontWeight: 600,
          },
        }}
        variant="filled"
        value={currency}
        onChange={handleChange}
        helperText={"Please select your currency"}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

// We add the proptypes that verify that the type of props received by the component
// are correct

SelectCurrency.propTypes = {
  label: PropTypes.string,
  form: PropTypes.object,
  setForm: PropTypes.func,
};

export default SelectCurrency;
