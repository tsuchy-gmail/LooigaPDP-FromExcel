import React from "react";
import styled from "styled-components";

import IconText from "./IconText";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import Paper from "../atoms/Paper";

const UpperSideWrapper = styled.div`
  display: flex;
  > :first-child {
    margin-right: 20px;
  }
`;

const TwoButtonsWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

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

type IconTextWithSelectProps = {
  type: string;
  text: string;
  leftButtonText: string;
  rightButtonText: string;
  items: string[];
};

const IconTextWithSelect: React.VFC<Partial<IconTextWithSelectProps>> = ({
  type,
  text,
  leftButtonText,
  rightButtonText,
  items,
}) => {
  return (
    <Paper width="93%" maxWidth="1600px" margin="0 auto">
      <Wrapper>
        <UpperSideWrapper>
          <IconText type={type} text={text} textSize="18px" />
          <TwoButtonsWrapper>
            <Button>
              <IconText type="ArrowRight" text={leftButtonText} />
            </Button>
            <Button>
              <IconText type="DeleteSweep" text={rightButtonText} />
            </Button>
          </TwoButtonsWrapper>
        </UpperSideWrapper>
        <Select items={items} />
      </Wrapper>
    </Paper>
  );
};

export default IconTextWithSelect;
