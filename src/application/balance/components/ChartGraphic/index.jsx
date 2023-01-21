/** Libraries */
import React from "react";

import Chart from "react-apexcharts";

import { Paper, useMediaQuery, useTheme } from "@mui/material";

/** Custom hooks */
import { useOperationsStore } from "../../../../hooks";

/** Utils */
import Title from "../../../utils/Title";

// This component is used to display the graph, which, using the data of the balance sheet's loads and discharges
// balance sheet loading and unloading data, it makes a representation of the

export const ChartGraphic = () => {
  // We extract the balance sheet status by means of this hook

  const { balance } = useOperationsStore();

  // We use useTheme and useMediaQuery to create the breakpoints that will help us make our component responsive.
  // that will be used to make our component responsive.

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <Paper
      elevation={0}
      square
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 5,
        marginLeft: sm ? 0 : md ? 0 : lg ? 0 : 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
        paddingTop: md ? 2 : 0,
      }}
    >
      <Title
        text={"Balance chart"}
        font={"h4"}
        weight={600}
        color={"#bcbcbb"}
      />
      <Chart
        style={{ marginBlock: sm ? 8 : 20 }}
        type="pie"
        width={sm ? "110%" : xl ? "120%" : "100%"}
        height={"100%"}
        series={[balance.expenses, balance.charges]}
        options={{
          colors: ["#c80f0f", "#0fc837"],
          labels: ["Expenses", "Charges"],
        }}
      ></Chart>
    </Paper>
  );
};
