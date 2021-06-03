import React from "react";
import styled from "styled-components";

import Checkbox from "../atoms/Checkbox";
import Text from "../atoms/Text";
import { TextProps } from "../atoms/Text";
import { CheckboxProps } from "../atoms/Checkbox";
import Icon from "../atoms/Icon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

type CheckboxWithTextProps = Partial<TextProps & CheckboxProps>;

//size, weight, color, ...checkboxProps

const CheckboxWithText: React.FC<CheckboxWithTextProps> = ({
  size,
  weight,
  color,
  children,
  ...checkboxProps
}) => {
  return (
    <Wrapper>
      <Checkbox {...checkboxProps} />
      <Text size={size} weight={weight} color={color}>
        {children}
      </Text>
    </Wrapper>
  );
};

export default CheckboxWithText;
