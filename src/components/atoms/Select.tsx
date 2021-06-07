import React, { VFC } from "react";
import {
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

type SelectProps = Partial<{
  items: (string | number)[];
  width: number | string;
  label: string;
  helper: string;
  size: string;
  weight: number;
  parentRef: React.RefObject<HTMLInputElement>;
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}>;

const MySelect: VFC<SelectProps> = ({
  items,
  width,
  label,
  helper,
  size,
  weight,
  parentRef,
  value,
  onChange,
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
        {label && <InputLabel>{label}</InputLabel>}
        <Select
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
        </Select>
        {helper && <FormHelperText>{helper}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default MySelect;
