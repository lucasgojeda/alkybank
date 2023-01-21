/** Libraries */
import React from "react";

import { Backdrop, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" size="80px" sx={{ display: "block" }} />
    </Backdrop>
  );
};
