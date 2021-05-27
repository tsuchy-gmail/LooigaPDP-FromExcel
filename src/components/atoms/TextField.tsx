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
  shrink?: boolean;
};

const MyTextField: VFC<TextFieldProps> = ({
  width,
  label,
  helper,
  size,
  weight,
  end,
  type,
  shrink,
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

  const inputLabelProps = {
    shrink: shrink,
  };

  return (
    <div>
      <TextField
        style={textFieldStyle}
        label={label}
        helperText={helper}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        type={type}
      />
    </div>
  );
};

export default MyTextField;
