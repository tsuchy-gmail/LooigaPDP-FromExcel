import * as React from "react";
import styled from "styled-components";

import TextField from "../atoms/TextField";
import IconText from "./IconText";

import Paper from "../atoms/Paper";

import { ChangeInput } from "../../utils/types";

const Wrapper = styled.div`
  & > {
    :first-child {
      margin-bottom: 25px;
    }
    :nth-child(2) {
      padding-left: 10px;
    }
  }
`;

type IconTextWithTextFieldProps = {
  type?: string;
  text?: string;
  iconSize?: string;
  placeholder?: string;
  parentRef?: React.RefObject<HTMLInputElement>;
  value?: string;
  onChange?: (event: ChangeInput) => void;
};

const IconTextWithTextField: React.VFC<IconTextWithTextFieldProps> = ({
  placeholder,
  parentRef,
  value,
  onChange,
  ...iconTextProps
}) => {
  return (
    <Paper>
      <Wrapper>
        <IconText textSize="18px" {...iconTextProps} />
        <TextField
          parentRef={parentRef}
          size="16px"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </Wrapper>
    </Paper>
  );
};

export default IconTextWithTextField;
