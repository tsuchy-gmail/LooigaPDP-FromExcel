import * as React from "react";
import styled from "styled-components";

import IconText from "./IconText";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import Paper from "../atoms/Paper";
import DialogButton from "../atoms/DialogButton";
import Text from "../atoms/Text";

import { ChangeSelect, HandleChange } from "../../utils/types";

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
  canRegister: boolean;
  handleRegister: () => void;
  alertMessage: string;
  value: string;
  onChange: HandleChange<ChangeSelect>;
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
  canRegister,
  alertMessage,
  handleRegister,
  value,
  onChange,
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
              canExecute={canRegister ?? true}
              alertMessage={alertMessage}
              handleExecution={handleRegister}
            >
              {registerDialog}
            </DialogButton>
            <DialogButton
              title={<Text weight={700}>{rightButtonText}</Text>}
              buttonText={
                <IconText type="DeleteSweep" text={rightButtonText} />
              }
              actionText="削除"
              autoFocus
            >
              {deleteDialog}
            </DialogButton>
          </TwoButtonsWrapper>
        </UpperSideWrapper>
        <Select
          items={items}
          value={value}
          onChange={onChange}
          parentRef={parentRef}
        />
      </Wrapper>
    </Paper>
  );
};

export default IconTextWithSelect;
