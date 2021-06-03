import React from "react";
import styled from "styled-components";

import TextField from "../atoms/TextField";
import IconText from "./IconText";

import Paper from "../atoms/Paper";

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
};

const IconTextWithTextField: React.VFC<IconTextWithTextFieldProps> = ({
  placeholder,
  ...iconTextProps
}) => {
  return (
    <Paper>
      <Wrapper>
        <IconText textSize="18px" {...iconTextProps} />
        <TextField size="16px" placeholder={placeholder} />
      </Wrapper>
    </Paper>
  );
};

export default IconTextWithTextField;
