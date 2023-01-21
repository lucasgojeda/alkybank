import { useMediaQuery, useTheme } from "@mui/material";

const useStyle = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    transform: "translate(-50%, -50%)",
    width: sm ? "70%" : md || lg ? "75%" : "65%",
    height: md ? "63%" : "58%",
    bgcolor: "background.paper",
    borderRadius: 10,
    background:
      " linear-gradient(0deg, #171fb36f, #1976d2b7, #1976d2, #0479ee)",
    boxShadow: 24,
    p: 3,
  };
  return style;
};

export default useStyle;
