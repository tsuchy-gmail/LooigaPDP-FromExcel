import React from "react";
import styled from "styled-components";

import Text from "../atoms/Text";
import Select from "../atoms/Select";
import { ChangeSelect, HandleChange } from "../../utils/types";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  margin-right: 20px;
`;
const SelectWrapper = styled.div`
  margin-top: -4px;
`;

type TextWithSelectProps = Partial<{
  text: string;
  textWeight: number;
  items: (string | number)[];
  selectWeight: number;
  selectWidth: string;
  value: string | number;
  onChange: HandleChange<ChangeSelect>;
  width: string;
  weight: number;
  innerValueList: (string | number)[];
  helper: string;
  label: string;
}>;

const TextWithSelect: React.VFC<TextWithSelectProps> = ({
  text,
  textWeight,
  ...selectProps
}) => {
  return (
    <Wrapper>
      {text && (
        <TextWrapper>
          <Text weight={textWeight ?? 400}>{text}</Text>
        </TextWrapper>
      )}
      <SelectWrapper>
        <Select innerPaddingBottom="1px" {...selectProps} />
      </SelectWrapper>
    </Wrapper>
  );
};

export default TextWithSelect;
