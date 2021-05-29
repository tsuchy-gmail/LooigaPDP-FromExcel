import React from "react";

import MuiCheckbox from "@material-ui/core/Checkbox";

type CheckboxProps = {
  color: string;
  scale: number;
};

const Checkbox: React.VFC<Partial<CheckboxProps>> = ({ color, scale }) => {
  const checkboxStyle = {
    color,
    transform: `scale(${scale})`,
  };

  return <MuiCheckbox style={checkboxStyle} />;
};

export default Checkbox;
