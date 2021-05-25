import React, { VFC } from "react";
import {
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

type SelectPrps = {
  items: (string | number)[];
  width?: number;
  label?: string;
  helper?: string;
  size?: string;
  weight?: number;
};

const MySelect: VFC<SelectPrps> = ({
  items,
  width,
  label,
  helper,
  size,
  weight,
}) => {
  const selectStyle = {
    width: width,
    fontSize: size,
    fontWeight: weight,
  };
  return (
    <FormControl>
      {label && <InputLabel>{label}</InputLabel>}
      <Select style={selectStyle}>
        <MenuItem>-</MenuItem>
        {items.map((item, index) => (
          <MenuItem value={index}>{item}</MenuItem>
        ))}
      </Select>
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default MySelect;
