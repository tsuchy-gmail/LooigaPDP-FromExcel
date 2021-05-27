import React, { VFC, FC } from "react";

type TextProps = {
  size?: string;
  weight?: number;
  color?: string;
};

const Text: FC<TextProps> = ({ size, weight, color, children }) => {
  const textStyle = {
    fontSize: size,
    fontWeight: weight,
    color: color,
  };

  return <div style={textStyle}>{children}</div>;
};

export default Text;
