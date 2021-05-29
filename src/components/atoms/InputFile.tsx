import React from "react";

import Button from "./Button";

type InputFileProps = {
  width: string | number;
  height: string | number;
  color: string;
  variant: "contained" | "outlined";
  id: string;
};

const InputFile: React.FC<Partial<InputFileProps>> = ({
  width,
  height,
  color,
  variant,
  id,
  children
}) => {
  return (
    <div>
      <input hidden id={id} type="file" />
      <Button width={width} height={height} color={color} variant={variant ?? "contained"}>
        <label htmlFor={id}>{children}</label>
      </Button>
    </div>
  );
};

export default InputFile;
