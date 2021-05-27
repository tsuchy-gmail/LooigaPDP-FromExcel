import React, { VFC } from "react";
import TextField, { TextFieldProps } from "./TextField";

const TimePicker: VFC<TextFieldProps> = (props) => {
  return <TextField type="time" shrink={true} {...props} />;
};

export default TimePicker;
