import React, { FC } from "react";
import { Button } from "@material-ui/core";

type ButtonProps = {
  width?: number;
  height?: number;
  color?: "primary" | "secondary";
  variant?: "contained" | "outlined";
};

type ButtonStyle = {
  width?: number;
  height?: number;
  textTransform: "none";
};

const MyButton: FC<ButtonProps> = ({
  width,
  height,
  color,
  variant,
  children,
}) => {
  const buttonStyle: ButtonStyle = {
    width,
    height,
    textTransform: "none",
  };
  return (
    <div>
      <Button style={buttonStyle} color={color} variant={variant}>
        {children}
      </Button>
    </div>
  );
};

export default MyButton;
