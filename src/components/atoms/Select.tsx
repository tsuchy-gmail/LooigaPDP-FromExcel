import React, { VFC } from "react";
import {
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

type SelectPrps = {
  items?: (string | number)[];
  width?: number | string;
  label?: string;
  helper?: string;
  size?: string;
  weight?: number;
  parentRef?: React.RefObject<HTMLInputElement>;
};

const MySelect: VFC<SelectPrps> = ({
  items,
  width,
  label,
  helper,
  size,
  weight,
  parentRef,
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
        <Select style={selectStyle} inputRef={parentRef}>
          <MenuItem>-</MenuItem>
          {items &&
            items.map((item, index) => (
              <MenuItem key={index} value={index} style={menuItemStyle}>
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
