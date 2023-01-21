/** Libraries */
import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { TextField, useMediaQuery, useTheme } from "@mui/material";

/** Utils */
import { colors } from "../../../../utils/colors";

/** Validations */
import { validationAmount, validationConcept } from "../../validations";

const TextFieldForm = ({ label, form, setForm }) => {
  // We use useTheme and useMediaQuery to create the breakpoints that will help us make our component responsive.
  // that will be used to make our component responsive.
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  // This status is used to display an error message resulting from the validation of that field.
  // the validation of that field

  const [msgError, setmsgError] = React.useState(false);

  // This function allows us to set the form by changing the previous value for the new one.
  // that is entered in the

  const dataChange = (data, value) => {
    switch (data) {
      case "Concepto":
        setForm({ ...form, concept: value });
        break;
      case "Monto":
        setForm({ ...form, amount: value });
        break;
      default:
        break;
    }
  };

  // By means of this useEffect we make the validations of each one of the fields
  // subscribing to the changes made in the form.

  useEffect(() => {
    if (form.amount.length > 0 && label === "Monto") {
      validationAmount(form.amount, setmsgError);
    }

    if (form.concept.length > 0 && label === "Concepto") {
      validationConcept(form.concept, setmsgError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <>
      <TextField
        error={msgError ? true : false}
        InputProps={{ style: { marginBottom: sm || md ? 30 : 0 } }}
        InputLabelProps={{
          style: {
            color: "#fff",
            fontWeight: 600,
          },
        }}
        inputProps={{
          style: { color: msgError ? colors.red : colors.white1 },
        }}
        id="outlined-basic"
        label={label}
        variant="filled"
        helperText={msgError ? msgError : ""}
        onChange={(event) => {
          dataChange(label, event.target.value);
        }}
        FormHelperTextProps={{
          style: {
            fontWeight: 600,
            marginTop: sm || md ? -25 : 0,
            marginBottom: sm || md ? 5 : 0,
          },
        }}
      />
    </>
  );
};

// We add the proptypes that verify that the type of props received by the component
// are correct

TextFieldForm.propTypes = {
  label: PropTypes.string,
  form: PropTypes.object,
  setForm: PropTypes.func,
};

export default TextFieldForm;
