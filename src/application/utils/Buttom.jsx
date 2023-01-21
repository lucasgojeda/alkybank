/** Libraries */
import React from "react";

import { Button } from "@mui/material";

const Buttom = (props) => {
  const {
    color,
    variant,
    text,
    funct,
    href,
    size,
    width,
    disabled,
    textColor,
    bgcolor,
  } = props;
  return (
    <Button
      disabled={disabled}
      style={{
        borderRadius: 10,
        width: width,
        color: textColor,
        backgroundColor: bgcolor,
      }}
      size={size}
      color={color}
      variant={variant}
      href={href}
      onClick={() => {
        funct();
      }}
    >
      {text}
    </Button>
  );
};

export default Buttom;
