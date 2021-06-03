import React, { VFC, FC } from "react";

export type TextProps = {
  size?: string;
  weight?: number;
  color?: string;
};

const Text: FC<TextProps> = ({ size, weight, color, children }) => {
  const textStyle = {
    fontSize: size,
    fontWeight: 700,
    color: color,
  };

  return <div style={{ fontWeight: 700 }}>{children}</div>;
};

export default Text;
