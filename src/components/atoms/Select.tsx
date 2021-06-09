import React, { VFC } from "react";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import MuiSelect from "@material-ui/core/Select";

type SelectProps = Partial<{
  items: (string | number)[];
  width: number | string;
  label: string;
  helper: string;
  size: string;
  weight: number;
  parentRef: React.RefObject<HTMLInputElement>;
  value: string | number;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  shrink: boolean;
}>;

const Select: VFC<SelectProps> = ({
  items,
  width,
  label,
  helper,
  size,
  weight,
  parentRef,
  value,
  onChange,
  shrink,
}) => {
  const formControlStyle = {
    width: width ?? "100%",
  };

  const selectStyle = {
    fontSize: size,
    fontWeight: weight ?? 700,
  };

  const menuItemStyle = {
    fontWeight: 700,
  };

  return (
    <div>
      <FormControl style={formControlStyle}>
        {label && <InputLabel shrink={shrink ?? true}>{label}</InputLabel>}
        <MuiSelect
          value={value}
          onChange={onChange}
          style={selectStyle}
          inputRef={parentRef}
        >
          <MenuItem>-</MenuItem>
          {items &&
            items.map((item) => (
              <MenuItem key={item} value={item} style={menuItemStyle}>
                {item}
              </MenuItem>
            ))}
        </MuiSelect>
        {helper && <FormHelperText>{helper}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default Select;
