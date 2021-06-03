import React from "react";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { lightBlack } from "../../utils/colors";

type DatePickerProps = {
  size?: string;
  weight?: number;
  color?: string;
  label?: string;
};

const MyDatePicker: React.VFC<DatePickerProps> = ({
  size,
  weight,
  color,
  label,
}) => {
  const now = new Date();
  const [value, setValue] = React.useState(now);
  const handleChange = (date: any) => {
    setValue(date);
  };
  const onlyDate = value.toISOString().substr(0, 11); //2021-05-26T

  const inputProps = {
    style: {
      fontSize: size,
      fontWeight: weight ?? 700,
      color: color,
    },
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        label={label}
        value={value}
        onChange={handleChange}
        format="yyyy-MM-dd"
        InputProps={inputProps}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MyDatePicker;
