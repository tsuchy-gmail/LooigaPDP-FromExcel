import React from "react";

import MuiCheckbox from "@material-ui/core/Checkbox";
import { primary } from "../../utils/colors";

export type CheckboxProps = {
  scale: number;
  icon: React.ReactElement;
  checkedIcon: React.ReactElement | React.ReactNode;
  value: any;
  onChange: () => void;
};

const Checkbox: React.VFC<Partial<CheckboxProps>> = ({
  scale,
  icon,
  checkedIcon,
  value,
  onChange,
}) => {
  const checkboxStyle = {
    transform: `scale(${scale})`,
  };

  return (
    <div>
      <MuiCheckbox
        icon={icon}
        checkedIcon={checkedIcon}
        color="primary"
        style={checkboxStyle}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Checkbox;
