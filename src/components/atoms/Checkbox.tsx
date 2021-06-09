import React, { ReactElement, ReactNode } from "react";

import MuiCheckbox from "@material-ui/core/Checkbox";
import { primary } from "../../utils/colors";
import { ChangeInput, HandleChange } from "../../utils/types";

export type CheckboxProps = {
  scale: number;
  icon: ReactElement;
  checkedIcon: ReactElement | ReactNode;
  checked: boolean;
  onChange: HandleChange<ChangeInput>;
};

const Checkbox: React.VFC<Partial<CheckboxProps>> = ({
  scale,
  icon,
  checkedIcon,
  checked,
  onChange,
}) => {
  const checkboxStyle = {
    transform: `scale(${scale})`,
  };

  return (
    <div>
      <MuiCheckbox
        checked={checked}
        onChange={onChange}
        icon={icon}
        checkedIcon={checkedIcon}
        color="primary"
        style={checkboxStyle}
      />
    </div>
  );
};

export default Checkbox;
