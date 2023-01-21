/** Libraries */
import React from "react";

import Paper from "@mui/material/Paper";
import { useMediaQuery, useTheme } from "@mui/material";

/** Components */
import Title from "../../../utils/Title";

/** Custom hooks */
import { useOperationsStore } from "../../../../hooks";

/** Utils */
import { colors } from "../../../../utils/colors";

// This component is in charge of displaying the value of the loads according to their type,
// apart from the balance sheet value

const Display = () => {
  // We extract the balance sheet status by means of this hook

  const { balance } = useOperationsStore();

  // We use useTheme and useMediaQuery to create the breakpoints that will help us make our component responsive.
  // that will be used to make our component responsive.

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div
      style={{
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={3}
        square
        style={{
          width: sm ? "100%" : "100%",
          borderRadius: 20,
          marginTop: 10,
          marginBottom: 40,
          background: "linear-gradient(10deg, #1976d28d, #1976d2, #1976d2)",
        }}
      >
        <Title
          text={"Total available"}
          font={sm ? "h6" : md ? "h6" : "h5"}
          align="center"
          color={colors.white}
        />
        <Title
          text={balance.total ? `$${balance.total}.00` : 0.0}
          font={sm ? "h6" : md ? "h4" : lg ? "h3" : "h2"}
          weight={600}
          color={colors.white1}
          align="center"
          shadow={true}
        />
      </Paper>

      <div
        style={{
          width: "100%",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: sm ? "column" : "row",
        }}
      >
        <div
          style={{
            width: sm ? "100%" : "45%",
            borderRadius: 20,
            marginBottom: 20,
            background: "linear-gradient(10deg, #4efb8b, #12cc34, #03ba43)",
            boxShadow: "1px 3px 4px rgba(0, 0, 0, 0.389)",
          }}
        >
          <Title
            text={"Charges"}
            font={sm ? "h6" : md ? "h6" : "h5"}
            align="center"
            color={colors.white1}
          />
          <Title
            text={balance.charges ? `$${balance.charges}` : 0}
            font={sm ? "h6" : md ? "h6" : "h4"}
            weight={600}
            color={colors.white1}
            align="center"
            shadow={true}
          />
        </div>

        <div
          style={{
            width: sm ? "100%" : "45%",
            borderRadius: 20,
            marginBottom: 20,
            background: "linear-gradient(10deg, #fb4e4e, #cc1212, #ba0303)",
            boxShadow: "1px 3px 4px rgba(0, 0, 0, 0.389)",
          }}
        >
          <Title
            text={"Expenses"}
            font={sm ? "h6" : md ? "h6" : "h5"}
            align="center"
            color={colors.white1}
          />
          <Title
            text={balance.expenses ? `$${balance.expenses}` : 0}
            font={sm ? "h6" : md ? "h6" : "h4"}
            weight={600}
            color={colors.white1}
            align="center"
            shadow={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Display;
