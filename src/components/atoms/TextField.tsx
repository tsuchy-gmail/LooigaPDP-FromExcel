import React, { VFC } from "react";
import MuiTextField from "@material-ui/core/TextField";

export type TextFieldProps = Partial<{
  width: number | string;
  label: string;
  helper: string;
  size: string;
  weight: number;
  end: string;
  placeholder: string;
  type: string;
  shrink: boolean;
  autoFocus: boolean;
  parentRef: React.RefObject<HTMLInputElement>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>;

const TextField: VFC<TextFieldProps> = ({
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
  value,
  onChange,
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
      <MuiTextField
        style={textFieldStyle}
        label={label}
        helperText={helper}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        placeholder={placeholder}
        type={type}
        autoFocus={autoFocus}
        inputRef={parentRef}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
