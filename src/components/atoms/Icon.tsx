import { VFC } from "react";
import * as materialIcons from "@material-ui/icons";

type IconProps = {
  type?: string;
  color?: string;
  size?: string;
};

const Icon: VFC<IconProps> = ({ type = "Apple", size, color }) => {
  const Icon = (materialIcons as any)[type];
  const iconStyle = {
    fontSize: size,
    color: color,
  };

  return <Icon style={iconStyle} />;
};

export default Icon;
