import { VFC, RefObject, useState, useEffect } from "react";
import * as React from "react";
import MuiTextField from "@material-ui/core/TextField";
import { ChangeInput } from "../../utils/types";

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
  parentRef: RefObject<HTMLInputElement>;
  value: string;
  onChange: (event: ChangeInput) => void;
  disabled: boolean;
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
  disabled,
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

  const [valueForDisplay, setValueForDisplay] = React.useState<string>();
  const handleChangeValueForDisplay = (event: ChangeInput) => {
    setValueForDisplay(event.target.value);
  };

  useEffect(() => {
    setValueForDisplay(value);
  }, [value]);

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
        value={valueForDisplay}
        onChange={handleChangeValueForDisplay}
        onBlur={onChange as any}
        disabled={disabled}
      />
    </div>
  );
};

export default TextField;
