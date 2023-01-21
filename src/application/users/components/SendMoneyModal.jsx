/** Libraries */
import React, { useState } from "react";

import {
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useFormik } from "formik";

/** Custom hooks */
import { useOperationsStore } from "../../../hooks";

/** Helpers */
import { YupSendMoneyValidations } from "../../../helpers";

const currencies = [
  {
    value: "ARS",
    label: "AR$",
  },
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

export const SendMoneyModal = ({ modalStatus, setModalStatus, activeUser }) => {

  const { StartSendMoney } = useOperationsStore();

  const [currency, setCurrency] = useState("ARS");

  const formik = useFormik({
    initialValues: {
      amount: 0,
      context: "",
    },

    validationSchema: YupSendMoneyValidations,
    onSubmit: (values, { resetForm }) => {
      try {
        StartSendMoney(
          {
            type: "payment",
            concept: values.context,
            amount: values.amount,
          },
          activeUser.id
        );
        setModalStatus(false)
      } catch (error) {
        console.log(error);
      }
      resetForm();
    },
  });

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  const handleModalWidth = () => {
    switch (true) {

      case sm:
        return "100%";
  
      case md:
        return "75vw";
  
      case lg:
        return "57.5vw";
  
      case xl:
        return "60vw";
  
      default:
        break;
    }
  }

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleClose = () => {
    setModalStatus(false);
  };

  return (
    <Box minWidth="100vh">
      <Modal
        open={modalStatus}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width="100%"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="form"
            width={handleModalWidth}
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            bgcolor="#fff"
            borderRadius={(sm) ? 'none' : '5px'}
            border="none"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            sx={{
              position: (sm) && 'absolute',
              top: (sm) && 0,
              left: (sm) && 0,
              height: (sm) ? '100vh' : '45vh',
            }}
          >
            <Box
              width="100%"
              height={ (sm) ? "12.5vh" : "7.5vh" }
              display="flex"
              justifyContent="center"
              alignItems={ (sm) ? "center" : "end" }
            >
              <Typography color="GrayText" variant="body2" fontSize="20px">
                Send money to {activeUser?.first_name}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap="10px"
              sx={{
                '& .MuiTextField-root': {
                  width: (sm) ? '70%' : '24ch',
                },
              }}
            >
              <Box
                width="100%"
                height={ (sm) ? "35vh" : "10vh" }
                display="flex"
                justifyContent={ (sm) ? "space-around" : "center" }
                alignItems={ (sm) ? "center" : "flex-start" }
                flexDirection={ (sm) ? "column" : "row" }
                gap="10px"
              >
                <TextField
                  required
                  id="outlined-required"
                  type="number"
                  variant="outlined"
                  label="Amount"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />

                <TextField
                  id="outlined-required"
                  select
                  required
                  disabled={true}
                  label="Currency"
                  value={currency}
                  onChange={handleChange}
                  helperText="Only allowed pesos (ARS)."
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <TextField
                required
                id="outlined-required"
                type="text"
                variant="outlined"
                label="Contexto"
                name="context"
                value={formik.values.context}
                onChange={formik.handleChange}
                error={formik.touched.context && Boolean(formik.errors.context)}
                helperText={formik.touched.context && formik.errors.context}
              />
            </Box>

            <Box
              width="100%"
              height={ (sm) ? "20vh" : "10vh" }
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="20px"
            >
              <Button type="submit" variant="contained">
                Send
              </Button>

              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
