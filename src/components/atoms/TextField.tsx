import React, { VFC } from "react";
import { TextField } from "@material-ui/core";

type TextFieldProps = {
  width?: number;
  label?: string;
  helper?: string;
  size?: string;
  weight?: number;
  end?: string;
};

const MyTextField: VFC<TextFieldProps> = ({
  width,
  label,
  helper,
  size,
  weight,
  end,
}) => {
  const textFieldStyle = {
    width,
  };
  const inputProps = {
    style: {
      fontSize: size,
      fontWeight: weight,
    },
    endAdornment: end,
  };
  return (
    <TextField
      style={textFieldStyle}
      label={label}
      helperText={helper}
      InputProps={inputProps}
    />
  );
};

export default MyTextField;
