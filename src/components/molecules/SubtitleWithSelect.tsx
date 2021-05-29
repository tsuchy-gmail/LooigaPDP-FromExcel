import React from "react";
import styled from "styled-components";

import IconText from "./IconText";
import Select from "../atoms/Select";
import Button from "../atoms/Button";

const Flex = styled.div`
  display: flex;
  > :first-child {
    margin-right: 20px;
  }
`;

const Flex2 = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

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

type SubtitleWithSelectProps = {
  type: string;
  subtitle: string;
  leftButtonText: string;
  rightButtonText: string;
  items: string[];
};

const SubtitleWithSelect: React.VFC<Partial<SubtitleWithSelectProps>> = ({
  type,
  subtitle,
  leftButtonText,
  rightButtonText,
  items,
}) => {
  return (
    <Wrapper>
      <Flex>
        <IconText type={type} text={subtitle} textSize="18px" weight={700} />
        <Flex2>
          <Button>
            <IconText type="ArrowRight" text={leftButtonText} />
          </Button>
          <Button>
            <IconText type="DeleteSweep" text={rightButtonText} />
          </Button>
        </Flex2>
      </Flex>
      <Select items={items} width="100%" />
    </Wrapper>
  );
};

export default SubtitleWithSelect;
