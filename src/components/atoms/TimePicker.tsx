import React, { VFC } from "react";
import TextField, { TextFieldProps } from "./TextField";

const TimePicker: VFC<TextFieldProps> = (props) => {
  return <TextField type="time" {...props} />;
};

export default TimePicker;
