import React, { VFC } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import TextField from "../atoms/TextField";
import TimePicker from "../atoms/TimePicker";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import Checkbox from "../atoms/Checkbox";
import CheckboxWithText from "../molecules/CheckboxWithText";
import { disable, secondary, primary } from "../../utils/colors";

import MuiIconButton from "@material-ui/core/IconButton";
import MuiPaper from "@material-ui/core/Paper";
import MuiFab from "@material-ui/core/Fab";

import Paper from "../atoms/Paper";

import { HandleChange, ChangeInput, ChangeSelect } from "../../utils/types";

import { CarrierSettingsValues } from "../organisms/CarriersSettings";

//--styled
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MainSettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-right: 30px;
  }
`;

const BreakSettingsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  > * {
    :not(:last-child) {
      margin-right: 30px;
    }
  }
`;

type IsChecked = { isRowChecked: boolean };

const SettingsWrapper = styled.div`
  opacity: ${(props: IsChecked) => (props.isRowChecked ? 1 : 0.3)};
`;

const CheckboxWrapper = styled.div`
  opacity: ${(props: IsChecked) => (props.isRowChecked ? 1 : 0.3)};
`;

const CheckCircleWrapper = styled.div`
  margin-right: 80px;
`;

const IconButtonWrapper = styled.div`
  margin-left: 80px;
  margin-top: -2px;
`;

//---

type CarrierSettingsRowProps = {
  deleteSettingsRow: () => void;
  carrierSettingsMap: Map<string, CarrierSettingsValues>;
  getHandleChangeSettings: (
    settingItem: string
  ) => HandleChange<ChangeInput | ChangeSelect>;
};

const CarrierSettingsRow: VFC<CarrierSettingsRowProps> = ({
  deleteSettingsRow,
  carrierSettingsMap,
  getHandleChangeSettings,
}) => {
  //---util
  const carrierCountOptions = [...new Array(50).keys()].map(
    (count) => count + 1
  ); //[1,2,3,.....50]
  const width = 120;
  //---

  const getStringValueAndOnChange = (settingItem: string) => {
    return {
      value: carrierSettingsMap.get(settingItem) as string,
      onChange: getHandleChangeSettings(settingItem),
    };
  };

  const isRowChecked = carrierSettingsMap.get("isRowChecked") as boolean;
  const enableBreak = carrierSettingsMap.get("enableBreak") as boolean;

  const paperStyle = {
    minWidth: "800px",
    background: isRowChecked ? "" : "rgba(200,200,200,0.3)",
  };

  return (
    <Paper elevation={3} {...paperStyle}>
      <Wrapper>
        <CheckCircleWrapper>
          <Checkbox
            checked={isRowChecked}
            onChange={getHandleChangeSettings("isRowChecked")}
            icon={<Icon type="RadioButtonUnchecked" />}
            checkedIcon={<Icon type="CheckCircle" color={primary} />}
            scale={1.4}
          />
        </CheckCircleWrapper>
        <SettingsWrapper isRowChecked={isRowChecked as boolean}>
          <MainSettingsWrapper>
            <Select
              value={carrierSettingsMap.get("carrierCount") as number}
              onChange={getHandleChangeSettings("carrierCount")}
              items={carrierCountOptions}
              weight={700}
              width={width}
              label="車両台数"
            />
            <TextField
              {...getStringValueAndOnChange("capacity")}
              width={width}
              label="積載容量"
              shrink={true}
            />
            <TimePicker
              {...getStringValueAndOnChange("departureTime")}
              width={width}
              label="出発時刻"
            />
            <TimePicker
              {...getStringValueAndOnChange("arrivalTime")}
              width={width}
              label="帰着時刻"
            />
          </MainSettingsWrapper>
          {carrierSettingsMap.get("enableBreak") && (
            <BreakSettingsWrapper>
              <TimePicker
                {...getStringValueAndOnChange("breakReadyTime")}
                width={width}
                label="休憩開始(可能)"
              />
              <TimePicker
                {...getStringValueAndOnChange("breakDueTime")}
                width={width}
                label="休憩終了(可能)"
              />
              <TextField
                {...getStringValueAndOnChange("breakDuration")}
                width={width}
                label="休憩時間"
                end="min"
                shrink={true}
              />
            </BreakSettingsWrapper>
          )}
        </SettingsWrapper>
        <CheckboxWrapper isRowChecked={isRowChecked}>
          <CheckboxWithText
            checked={enableBreak}
            onChange={getHandleChangeSettings("enableBreak")}
            weight={enableBreak ? 700 : 400}
          >
            休憩あり
          </CheckboxWithText>
        </CheckboxWrapper>

        <IconButtonWrapper>
          <MuiIconButton onClick={deleteSettingsRow}>
            <Icon type="DeleteSweep" color={secondary} />
          </MuiIconButton>
        </IconButtonWrapper>
      </Wrapper>
    </Paper>
  );
};

export default CarrierSettingsRow;
