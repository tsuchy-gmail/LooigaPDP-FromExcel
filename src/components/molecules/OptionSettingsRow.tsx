import React, { useState } from "react";
import styled from "styled-components";

import CheckboxWithText from "./CheckboxWithText";
import Radio from "../atoms/Radio";
import Select from "../atoms/Select";
import TextWithSelect from "../molecules/TextWithSelect";
import Paper from "../atoms/Paper";
import TextField from "../atoms/TextField";
import { off } from "../../utils/colors";
import { HandleChange, ChangeInput, ChangeSelect } from "../../utils/types";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  margin-right: 30px;
  width: 200px;
`;

const RadioWrapper = styled.div`
  margin-right: 30px;
`;

const TextFieldWrapper = styled.div`
  margin-top: -5px;
`;

const ChangeOpacity = styled.div`
  opacity: ${(props: { checked?: boolean }) => (props.checked ? 1 : 0.3)};
  display: flex;
`;

type OptionSettingsRowProps = Partial<{
  option: string;
  checked: boolean;
  onChangeCheckbox: () => void;
  radioDisplayTextList: string[];
  radioValueList: string[];
  radioCheckedValue: string;
  onChangeRadio: HandleChange<ChangeInput>;
  selectItems: (string | number)[];
  selectValueList: (string | number)[];
  selectText: string;
  selectLabel: string;
  selectHelper: string;
  selectWidth: string;
  selectedValue: string | number;
  onChnageSelect: HandleChange<ChangeSelect>;
  textValue: string;
  textLabel: string;
  textEnd: string;
  onChangeTextField: HandleChange<ChangeInput>;
}>;

const OptionSettingsRow: React.VFC<OptionSettingsRowProps> = ({
  option,
  checked,
  onChangeCheckbox,
  radioDisplayTextList,
  radioValueList,
  radioCheckedValue,
  onChangeRadio,
  selectItems,
  selectValueList,
  selectText,
  selectLabel,
  selectHelper,
  selectWidth,
  selectedValue,
  onChnageSelect,
  textValue,
  textLabel,
  textEnd,
  onChangeTextField,
}) => {
  const paperStyle = {
    padding: "30px 30px",
  };

  return (
    <Paper elevation={2} {...paperStyle}>
      <Wrapper>
        <CheckboxWrapper>
          <CheckboxWithText checked={checked} onChange={onChangeCheckbox}>
            {option}
          </CheckboxWithText>
        </CheckboxWrapper>
        <ChangeOpacity checked={checked}>
          {radioDisplayTextList && (
            <RadioWrapper>
              <Radio
                displayTextList={radioDisplayTextList}
                valueList={radioValueList}
                checkedValue={radioCheckedValue}
                onChange={onChangeRadio}
              />
            </RadioWrapper>
          )}
          {selectItems && (
            <TextWithSelect
              text={selectText}
              label={selectLabel}
              value={selectedValue}
              onChange={onChnageSelect}
              items={selectItems}
              innerValueList={selectValueList}
              width={selectWidth}
              weight={400}
              helper={selectHelper}
            />
          )}
          {onChangeTextField && (
            <TextFieldWrapper>
              <TextField
                type="number"
                value={textValue}
                onChange={onChangeTextField}
                label={textLabel}
                weight={400}
                end={textEnd}
                shrink
              />
            </TextFieldWrapper>
          )}
        </ChangeOpacity>
      </Wrapper>
    </Paper>
  );
};

export default OptionSettingsRow;
