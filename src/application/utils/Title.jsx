/** Libraries */
import React from "react";

import { Typography } from "@mui/material";

const Title = (props) => {
  const { text, font, color, align, weight, shadow } = props;
  return (
    <Typography
      variant={font}
      align={align}
      style={{
        color: color,
        fontWeight: weight,
        textShadow: shadow ? "1px 0px 1px black " : "none",
      }}
    >
      {text}
    </Typography>
  );
};

export default Title;
