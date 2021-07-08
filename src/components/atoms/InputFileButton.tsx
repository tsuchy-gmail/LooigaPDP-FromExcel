import * as React from "react";

import Button, { ButtonProps } from "./Button";
import Text from "./Text";
import IconText from "../molecules/IconText";

export type InputFileButtonProps = {
  id: string;
  parentRef: React.RefObject<HTMLInputElement>;
} & ButtonProps;

const InputFileButton: React.FC<Partial<InputFileButtonProps>> = ({
  width,
  height,
  color,
  background,
  variant,
  id = "initialId",
  parentRef,
}) => {
  const [file, setFile] = React.useState<File>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) setFile(fileList[0]);
  };

  const buttonText = file ? (
    <IconText type="CheckCircleOutline" text={file.name} marginRight="10px" />
  ) : (
    <Text weight={700}>ファイルを選択</Text>
  );

  return (
    <div>
      <input
        accept=".xlsx"
        onChange={handleChange}
        hidden
        id={id}
        type="file"
        ref={parentRef}
      />
      <label htmlFor={id}>
        <Button
          width={width}
          height={height}
          color={color}
          background={background}
          variant={variant}
          component="span" //defaultの'button'のままだとなぜかtype='file'が機能しない
        >
          <Text weight={500}>{buttonText}</Text>
        </Button>
      </label>
    </div>
  );
};

export default InputFileButton;
