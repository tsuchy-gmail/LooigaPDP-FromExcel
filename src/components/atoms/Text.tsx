import { VFC, FC } from "react";

export type TextProps = {
  size?: string;
  weight?: number;
  color?: string;
};

type TextStyle = Partial<{
  fontSize: string;
  fontWeight: number;
  color: string;
  textTransform: "none";
}>;

const Text: FC<TextProps> = ({ size, weight, color, children }) => {
  const textStyle: TextStyle = {
    fontSize: size,
    fontWeight: weight ?? 700,
    color: color,
    textTransform: "none",
  };

  return <div style={textStyle}>{children}</div>;
};

export default Text;
