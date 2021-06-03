import React from "react";
import styled from "styled-components";

import IconText from "./IconText";
import InputFileButton, {
  InputFileButtonProps,
} from "../atoms/InputFileButton";
import { IconTextProps } from "./IconText";
import Paper from "../atoms/Paper";
import { primary } from "../../utils/colors";

type IconTextWithInputFileButtonProps = Partial<
  IconTextProps & InputFileButtonProps
>;

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

const IconTextWithInputFileButton: React.FC<IconTextWithInputFileButtonProps> = ({
  type,
  text,
  children,
  ...buttonProps
}) => {
  return (
    <Paper>
      <Wrapper>
        <IconText type={type} text={text} />
        <InputFileButton variant="outlined" {...buttonProps}>
          {children ?? "File"}
        </InputFileButton>
      </Wrapper>
    </Paper>
  );
};

export default IconTextWithInputFileButton;
