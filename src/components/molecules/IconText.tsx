import * as React from "react";
import styled from "styled-components";

import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

export type IconTextProps = {
  type?: string;
  text?: string;
  marginRight?: string;
  weight?: number;
  iconSize?: string;
  textSize?: string;
  iconColor?: string;
  textColor?: string;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: ${(props: IconTextProps) => props.marginRight ?? "4px"};
  }
`;

const IconText: React.FC<IconTextProps> = ({
  type,
  marginRight,
  iconSize,
  textSize,
  iconColor,
  textColor,
  weight,
  text,
}) => {
  return (
    <Wrapper marginRight={marginRight}>
      <Icon type={type} size={iconSize} color={iconColor} />
      <Text size={textSize} weight={weight} color={textColor}>
        {text ?? "Apple"}
      </Text>
    </Wrapper>
  );
};

export default IconText;
