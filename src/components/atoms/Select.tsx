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
    <div>
      <FormControl style={selectStyle}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select>
          <MenuItem>-</MenuItem>
          {items &&
            items.map((item, index) => (
              <MenuItem key={index} value={index}>
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
