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
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const MyDatePicker: React.VFC<DatePickerProps> = ({
  size,
  weight,
  color,
  label,
  value,
  onChange,
}) => {
  //const onlyDate = value.toISOString().substr(0, 11); //2021-05-26T

  const inputProps = {
    style: {
      fontSize: size,
      fontWeight: weight ?? 700,
      color: color,
    },
    readOnly: true,
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        label={label}
        value={value}
        onChange={onChange}
        format="yyyy-MM-dd"
        InputProps={inputProps}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MyDatePicker;
