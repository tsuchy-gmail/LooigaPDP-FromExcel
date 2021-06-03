import React from "react";

import Button, { ButtonProps } from "./Button";

export type InputFileButtonProps = {
  id: string;
} & ButtonProps;

const InputFileButton: React.FC<Partial<InputFileButtonProps>> = ({
  width,
  height,
  color,
  background,
  variant,
  id = "initialId",
  children,
}) => {
  return (
    <div>
      <input hidden id={id} type="file" />
      <label htmlFor={id}>
        <Button
          width={width}
          height={height}
          color={color}
          background={background}
          variant={variant}
          component="span" //defaultの'button'のままだとなぜかtype='file'が機能しない
        >
          {children}
        </Button>
      </label>
    </div>
  );
};

export default InputFileButton;
