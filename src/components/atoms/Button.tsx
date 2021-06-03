import React, { FC } from "react";
import MuiButton from "@material-ui/core/Button";

export type ButtonProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
  background?: string;
  variant?: "contained" | "outlined";
  onClick?: () => void;
  component?: string;
};

type ButtonStyle = {
  width?: string | number;
  height?: string | number;
  color?: string;
  background?: string;
  textTransform: "none";
};

const Button: FC<ButtonProps> = ({
  width,
  height,
  color,
  background,
  children,
  ...buttonProps
}) => {
  const buttonStyle: ButtonStyle = {
    width: width ?? "100%",
    height,
    color,
    background,
    textTransform: "none",
  };
  return (
    <div>
      <MuiButton style={buttonStyle} {...buttonProps}>
        {children}
      </MuiButton>
    </div>
  );
};

export default Button;
