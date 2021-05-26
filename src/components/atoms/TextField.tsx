import React, { VFC } from "react";
import { TextField } from "@material-ui/core";

export type TextFieldProps = {
  width?: number;
  label?: string;
  helper?: string;
  size?: string;
  weight?: number;
  end?: string;
  type?: string;
};

const MyTextField: VFC<TextFieldProps> = ({
  width,
  label,
  helper,
  size,
  weight,
  end,
  type,
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
    <div>
      <TextField
        style={textFieldStyle}
        label={label}
        helperText={helper}
        InputProps={inputProps}
        type={type}
      />
    </div>
  );
};

export default MyTextField;
