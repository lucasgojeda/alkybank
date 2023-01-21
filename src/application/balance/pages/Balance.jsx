/** Libraries */
import React from "react";
import { useMediaQuery, useTheme, Paper, Container } from "@mui/material";

/** Components */
import Title from "../../utils/Title";
import ButtonsContain from "../components/ButtonsContain";
import Display from "../components/Display";
import { ChartGraphic } from "../components/ChartGraphic";
import SkeletonBalance from "../components/SkeletonBalance";

/** Custom hooks */
import { useOperationsStore } from "../../../hooks";

/** Utils */
import { colors } from "../../../utils/colors";

// This component shows the complete view of the balance sheet with all its subcomponents in which the status of the loads is reflected.
// subcomponents in which the status of loads is reflected,
// balance sheet and graph of the balance sheet

const Balance = () => {
  // We extract the balance sheet status by means of this hook

  const { balance } = useOperationsStore();

  // We use useTheme and useMediaQuery to be able to create the breackpoints
  // that will be used to make our component responsive.

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <>
      {!!balance.total ? (
        <Container
          className={"graphic"}
          sx={{
            width: "100%",
            height: sm ? "0%" : "100%",
            flexDirection: sm ? "column" : "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sm ? -10 : "3%",
            paddingTop: sm ? "10%" : 0,
            borderRadius: 5,
            marginLeft: sm ? 0 : "8%",
          }}
        >
          {sm && <ChartGraphic />}
          <Paper
            elevation={0}
            square
            sx={{
              width: sm ? "78%" : "100%",
              height: "80%",
              marginLeft: sm ? 0 : xl ? 5 : 0,
              marginBottom: sm ? 15 : 0,
              borderRadius: 5,
              padding: 5,
              backgroundColor: "transparent",
            }}
          >
            <Title
              text="My balance"
              font="h4"
              align="left"
              weight={600}
              color={colors.grey2}
            />
            <Display />
            <ButtonsContain />
          </Paper>
          {!sm && <ChartGraphic />}
        </Container>
      ) : (
        <>
          <SkeletonBalance />
        </>
      )}
    </>
  );
};

export default Balance;
