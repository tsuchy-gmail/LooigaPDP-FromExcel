import React, { FC } from "react";
import MuiButton from "@material-ui/core/Button";

export type ButtonProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
  variant?: "contained" | "outlined";
  onClick?: () => void
};

type ButtonStyle = {
  width?: string | number;
  height?: string | number;
  color?: string;
  textTransform: "none";
};

const Button: FC<ButtonProps> = ({
  width,
  height,
  color,
  variant,
  children,
  onClick,
}) => {
  const buttonStyle: ButtonStyle = {
    width,
    height,
    color,
    textTransform: "none",
  };
  return (
    <div>
      <MuiButton onClick={onClick} style={buttonStyle} variant={variant}>
         {children}
      </MuiButton>
    </div>
  );
};

export default Button;
