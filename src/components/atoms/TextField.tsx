import React, { VFC } from "react";
import { TextField } from "@material-ui/core";

export type TextFieldProps = {
  width?: number | string;
  label?: string;
  helper?: string;
  size?: string;
  weight?: number;
  end?: string;
  placeholder?: string;
  type?: string;
  shrink?: boolean;
  autoFocus?: boolean;
  parentRef?: React.RefObject<HTMLInputElement>;
};

const MyTextField: VFC<TextFieldProps> = ({
  width,
  label,
  helper,
  size,
  weight,
  end,
  placeholder,
  type,
  shrink,
  autoFocus,
  parentRef,
}) => {
  const textFieldStyle = {
    width: width ?? "100%",
  };

  const inputProps = {
    style: {
      fontSize: size,
      fontWeight: weight ?? 700,
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
        placeholder={placeholder}
        type={type}
        autoFocus={autoFocus}
        inputRef={parentRef}
      />
    </div>
  );
};

export default MyTextField;
