import React from "react";
import styled from "styled-components";
import MuiFormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox from "../atoms/Checkbox";
import Text from "../atoms/Text";
import { TextProps } from "../atoms/Text";
import { CheckboxProps } from "../atoms/Checkbox";
import Icon from "../atoms/Icon";

const TextWrapper = styled.div`
  margin-bottom: -2px;
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
    <MuiFormControlLabel
      control={<Checkbox {...checkboxProps} />}
      label={
        <TextWrapper>
          <Text size={size} weight={weight} color={color}>
            {children}
          </Text>
        </TextWrapper>
      }
    />
  );
};

export default CheckboxWithText;
