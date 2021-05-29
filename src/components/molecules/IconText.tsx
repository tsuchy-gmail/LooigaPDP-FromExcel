import React from "react";
import styled from "styled-components";

import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

type IconTextProps = {
  type?: string;
  text?: string;
  marginRight?: string;
  weight?: number;
  iconSize?: string;
  textSize?: string;
  color?: string;
};

const Wrapper = styled.div`
  color: ${(props: IconTextProps) => props.color ?? ""};
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: ${(props: IconTextProps) => props.marginRight ?? "4px"};
  }
`;

const IconText: React.FC<IconTextProps> = ({
  type,
  color,
  marginRight,
  iconSize,
  textSize,
  weight,
  text,
}) => {
  return (
    <Wrapper marginRight={marginRight} color={color}>
      <Icon type={type} size={iconSize} />
      <Text size={textSize} weight={weight}>
        {text ?? "Apple"}
      </Text>
    </Wrapper>
  );
};

export default IconText;
