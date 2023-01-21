/** Libraries */
import React from "react";
import { useMediaQuery, useTheme, Skeleton, Stack } from "@mui/material";

// This component is in charge of creating an animation of the screen loading its components.
// loading its components

const StackBalance = () => {
  // We use the dimensions provided by windows for our screen in question
  // to be able to adapt certain values
  const { innerHeight: heigth, innerWidth: width } = window;

  // We use useTheme and useMediaQuery to create the breakpoints that will help us make our component responsive.
  // that will be used to make our component responsive.

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      data-testid="balance-skeleton"
      sx={{
        marginInline: sm ? 0 : md ? 15 : 20,
        width: sm ? width * 0.8 : md ? width * 0.55 : width * 0.35,
      }}
    >
      <Skeleton
        variant="text"
        style={{ fontSize: 50, marginTop: sm ? width * 0.1 : 0 }}
        width={sm ? width * 0.25 : width * 0.14}
      />
      <Skeleton
        variant="rounded"
        width={sm ? "100%" : width * 0.35}
        height={sm ? heigth * 0.08 : md ? heigth * 0.08 : heigth * 0.18}
        sx={{ marginBlock: width * 0.002 }}
      />
      <Stack
        sx={{
          flexDirection: sm ? "column" : "row",
          display: "flex",
          justifyContent: "space-between",
          marginBlock: sm ? "2%" : 0,
        }}
      >
        <Skeleton
          style={{ marginBlock: sm ? "2%" : 0 }}
          variant="rounded"
          width={sm ? "100%" : "45%"}
          height={sm ? heigth * 0.08 : md ? heigth * 0.08 : heigth * 0.15}
        />
        <Skeleton
          style={{ marginBlock: sm ? "2%" : 0 }}
          variant="rounded"
          width={sm ? "100%" : "45%"}
          height={sm ? heigth * 0.08 : md ? heigth * 0.08 : heigth * 0.15}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          marginBlock: width * 0.002,
        }}
      >
        <Skeleton
          variant="rounded"
          width={"45%"}
          height={md ? heigth * 0.06 : heigth * 0.07}
        />
        <Skeleton
          variant="rounded"
          width={"45%"}
          height={md ? heigth * 0.06 : heigth * 0.07}
        />
      </Stack>
    </Stack>
  );
};

const StackGraphic = () => {
  const { innerWidth: width } = window;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack sx={{ width: sm ? width * 0.8 : width * 0.4 }}>
      <Skeleton
        variant="text"
        style={{ fontSize: 40 }}
        width={sm ? width * 0.7 : width * 0.24}
      />
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          marginBlock: 2,
        }}
      >
        <Skeleton variant="text" style={{ fontSize: 10 }} width={60} />
        <Skeleton variant="text" style={{ fontSize: 10 }} width={60} />
      </Stack>
      <Skeleton
        variant="circular"
        width={sm ? width * 0.45 : width * 0.18}
        height={sm ? width * 0.45 : width * 0.18}
        sx={{ marginBottom: sm ? 2 : md ? 12 : 5 }}
      />
    </Stack>
  );
};

const SkeletonBalance = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const { innerHeight: heigth, innerWidth: width } = window;
  return (
    <Stack
      spacing={1}
      sx={{
        width: sm ? width * 1 : width * 0.8,
        height: sm
          ? heigth * 0.6
          : md
            ? heigth * 0.38
            : lg
              ? heigth * 0.7
              : heigth * 0.8,
        flexDirection: sm ? "column" : "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: sm ? -20 : md ? 0 : "3%",
        paddingTop: sm ? "33%" : md ? -60 : 0,
        borderRadius: 5,
        marginLeft: sm ? 0 : md ? "8%" : "5%",
      }}
    >
      {sm ? (
        <>
          <StackGraphic /> <StackBalance />
        </>
      ) : (
        <>
          <StackBalance />
          <StackGraphic />
        </>
      )}
    </Stack>
  );
};
export default SkeletonBalance;
