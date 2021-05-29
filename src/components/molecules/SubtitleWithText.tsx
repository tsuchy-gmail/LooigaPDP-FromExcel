import React from "react";
import styled from "styled-components";

import TextField from "../atoms/TextField";
import IconText from "./IconText";

const Wrapper = styled.div`
  background: cornsilk; /*区切りを見分けるため(後に削除)*/
  & > {
    :first-child {
      margin-bottom: 25px;
    }
    :nth-child(2) {
      padding-left: 10px;
    }
  }
`;

type SubtitleWithTextProps = {
  type?: string;
  subtitle?: string;
  iconSize?: string;
  placeholder?: string;
};

const SubtitleWithText: React.VFC<SubtitleWithTextProps> = ({
  type,
  subtitle,
  iconSize,
  placeholder,
}) => {
  return (
    <Wrapper>
      <IconText
        type={type}
        iconSize={iconSize}
        textSize="18px"
        weight={700}
        text={subtitle}
      />
      <TextField
        width="100%"
        size="16px"
        weight={700}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default SubtitleWithText;
