import React from "react";
import styled from "styled-components";

import IconText from "./IconText";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import Paper from "../atoms/Paper";
import DialogButton from "../atoms/DialogButton";
import Text from "../atoms/Text";

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
  title: string;
  leftButtonText: string;
  rightButtonText: string;
  items: string[];
  parentRef: React.RefObject<HTMLInputElement>;
  registerDialog: React.ReactElement;
  deleteDialog: React.ReactElement;
};

const IconTextWithSelect: React.VFC<Partial<IconTextWithSelectProps>> = ({
  type,
  text,
  title,
  leftButtonText,
  rightButtonText,
  items,
  parentRef,
  registerDialog,
  deleteDialog,
}) => {
  return (
    <Paper>
      <Wrapper>
        <UpperSideWrapper>
          <IconText type={type} text={text} textSize="18px" />
          <TwoButtonsWrapper>
            <DialogButton
              title={<Text weight={700}>{leftButtonText}</Text>}
              buttonText={<IconText type="ArrowRight" text={leftButtonText} />}
              actionText="登録"
            >
              {registerDialog}
            </DialogButton>
            <DialogButton
              title={<Text weight={700}>{rightButtonText}</Text>}
              buttonText={
                <IconText type="DeleteSweep" text={rightButtonText} />
              }
              actionText="削除"
            >
              {deleteDialog}
            </DialogButton>
          </TwoButtonsWrapper>
        </UpperSideWrapper>
        <Select items={items} parentRef={parentRef} />
      </Wrapper>
    </Paper>
  );
};

export default IconTextWithSelect;
