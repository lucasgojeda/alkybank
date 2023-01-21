/** Libraries */
import * as React from "react";

import PropTypes from "prop-types";

import { useMediaQuery, useTheme } from "@mui/material";
import { Box, Modal } from "@mui/material";

/** Components */
import SelectCurrency from "../SelectCurrency";
import TextFieldForm from "../TextFieldForm";
import Title from "../../../utils/Title";
import Button from "../../../utils/Buttom";

/** Custom hooks */
import { useOperationsStore } from "../../../../hooks";

/** Utils */
import { colors } from "../../../../utils/colors";

/** Validations */
import { validation } from "../../validations";

/** Styles */
import style from "./style";

// This component is in charge of rendering a modal that incorporates the form
// necessary to be able to carry out the loads

const AddBalanceForm = ({ open, setOpen, type }) => {
  // We use useTheme and useMediaQuery to be able to create the breackpoints
  // that will be used to make our component responsive.

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  // By means of the hook of the operations we extract the balance sheet status and the function
  // that allows us to add a new load to it.

  const { StartAddNewCharge, balance } = useOperationsStore();

  // By means of this status we verify the enabling or disabling of the button
  // to send the form

  const [toSend, settoSend] = React.useState(false);

  // We initialize the state of the form

  const [form, setForm] = React.useState({
    amount: "",
    concept: "",
    currency: "",
    type: "",
  });

  // With this function we send the data through our hook function.
  // Then we reset the form values and close the modal that contains it.

  const handleToSend = () => {
    handleClose();
    StartAddNewCharge({
      amount: form.amount,
      type: type,
      concept: form.concept,
    });
  };

  // This function is used to close the form, either because the form wants to be closed or because the values are being sent
  // or because the values of the form are sent.

  const handleClose = () => {
    setOpen(false);
    setForm({
      amount: "",
      concept: "",
      currency: "",
      type: type,
    });
  };

  // With this useEffect that subscribes to the changes of the form, we execute the validation of the fields.
  // the validation of the form fields, giving the possibility to enable or disable the submit button if the data entered are not the required ones.
  // the submit button if the data entered are not the required ones.

  React.useEffect(() => {
    if (balance.total > 0) {
      validation({ ...form }, settoSend);
    }
    // eslint-disable-next-line
  }, [form]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title
            text={type === "topup" ? "Load balance" : "Charge expense"}
            font="h3"
            align="center"
            color={colors.white1}
          />
          <Title
            text={
              type === "topup"
                ? "Here you can load money into your account"
                : balance.total > 0
                ? "Here you can add an expense of your salary"
                : "Your balance is 0, you cannot add expenses"
            }
            font={sm || md ? "h7" : "h6"}
            weight={sm || md ? 600 : 500}
            align="center"
            color={colors.white}
          />
          <div
            style={{
              flexDirection: sm || md ? "column" : "row",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <TextFieldForm label={"Amount"} form={form} setForm={setForm} />
            <TextFieldForm label={"Concept"} form={form} setForm={setForm} />
            <SelectCurrency label={"Currency"} form={form} setForm={setForm} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              // disabled={!toSend}
              color="primary"
              text={type === "topup" ? "Add money" : "Add expense"}
              variant="contained"
              size="large"
              width={300}
              funct={handleToSend}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

// We add the proptypes that verify that the type of props received by the component
// are correct

AddBalanceForm.propTypes = {
  type: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default AddBalanceForm;
