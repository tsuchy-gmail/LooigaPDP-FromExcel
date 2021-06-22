import React, { VFC, useState } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import TextField from "../atoms/TextField";
import TimePicker from "../atoms/TimePicker";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import Checkbox from "../atoms/Checkbox";
import CheckboxWithText from "./CheckboxWithText";
import { disable, secondary, primary, off } from "../../utils/colors";

import MuiIconButton from "@material-ui/core/IconButton";
import MuiPaper from "@material-ui/core/Paper";
import MuiFab from "@material-ui/core/Fab";

import Paper from "../atoms/Paper";

import { HandleChange, ChangeInput, ChangeSelect } from "../../utils/types";

import { CarrierSettingsValues } from "../organisms/Carriers";
import { Depots } from "../organisms/Depots";

//--styled

const Wrapper = styled.div`
  display: flex;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MainSettingsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BreakSettingsWrapper = styled.div`
  display: flex;
`;

const WithMultiDepot = styled.div`
  display: flex;
`;

type IsChecked = { isRowChecked: boolean };

const SettingsWrapper = styled.div`
  opacity: ${(props: IsChecked) => (props.isRowChecked ? 1 : 0.3)};
  > :not(:first-child) {
    margin-top: 50px;
  }
  > * {
    > :not(:last-child) {
      margin-right: 30px;
    }
  }
`;

const checkboxWrapperHeight = 30;
const CheckboxWrapper = styled.div`
  opacity: ${(props: IsChecked) => (props.isRowChecked ? 1 : 0.3)};
  margin-left: 40px;
  display: flex;
  justify-content: flex-end;
  height: ${checkboxWrapperHeight}px;
  margin-top: -${checkboxWrapperHeight * 2}px;
  margin-bottom: ${checkboxWrapperHeight}px;
`;

const CheckCircleWrapper = styled.div`
  margin-right: 70px;
`;

const IconButtonWrapper = styled.div`
  margin-left: 70px;
  margin-top: -2px;
`;

//---

type CarrierSettingsRowProps = {
  deleteSettingsRow: () => void;
  carrierSettingsMap: Map<string, CarrierSettingsValues>;
  getHandleChangeSettings: (
    settingItem: string
  ) => HandleChange<ChangeInput | ChangeSelect>;
  depotList: Depots;
};

const CarrierSettingsRow: VFC<CarrierSettingsRowProps> = ({
  deleteSettingsRow,
  carrierSettingsMap,
  getHandleChangeSettings,
  depotList,
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
  const enableMultiDepot = carrierSettingsMap.get(
    "enableMultiDepot"
  ) as boolean;

  const paperStyle = {
    minWidth: "600px",
    background: isRowChecked ? "" : off,
  };

  return (
    <Paper elevation={3} {...paperStyle}>
      <CheckboxWrapper isRowChecked={isRowChecked}>
        <CheckboxWithText
          checked={enableMultiDepot}
          onChange={getHandleChangeSettings("enableMultiDepot")}
          weight={enableMultiDepot ? 700 : 400}
        >
          マルチデポ
        </CheckboxWithText>
        <CheckboxWithText
          checked={enableBreak}
          onChange={getHandleChangeSettings("enableBreak")}
          weight={enableBreak ? 700 : 400}
        >
          休憩あり
        </CheckboxWithText>
      </CheckboxWrapper>
      <HorizontalWrapper>
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
          {enableMultiDepot && (
            <WithMultiDepot>
              <Select
                {...getStringValueAndOnChange("startDepotId")}
                items={[...depotList.keys()]}
                innerValueList={[...depotList.values()].map(
                  (depotInfo) => depotInfo["id"]
                )}
                label="出発デポ"
                width={width * 2 + 30}
              />
              <Select
                {...getStringValueAndOnChange("endDepotId")}
                items={[...depotList.keys()]}
                innerValueList={[...depotList.values()].map(
                  (depotInfo) => depotInfo["id"]
                )}
                label="帰着デポ"
                width={width * 2 + 30}
              />
            </WithMultiDepot>
          )}
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
              {...getStringValueAndOnChange("startTime")}
              width={width}
              label="出発時刻"
            />
            <TimePicker
              {...getStringValueAndOnChange("endTime")}
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
        <IconButtonWrapper>
          <MuiIconButton onClick={deleteSettingsRow}>
            <Icon type="DeleteSweep" color={secondary} />
          </MuiIconButton>
        </IconButtonWrapper>
      </HorizontalWrapper>
    </Paper>
  );
};

export default CarrierSettingsRow;
