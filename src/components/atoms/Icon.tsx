import React, { VFC } from "react";
import * as materialIcons from "@material-ui/icons";

type IconProps = {
  type?: string;
  color?: "primary" | "secondary" | "action";
  size?: string;
};

const Icon: VFC<IconProps> = ({ type = "Apple", size, color }) => {
  const Icon = (materialIcons as any)[type];
  const iconStyle = {
    fontSize: size,
  };

  return <Icon style={iconStyle} color={color} />;
};

export default Icon;
