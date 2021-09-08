import { VFC, useState, useEffect } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import TextField from "../atoms/TextField";
import TimePicker from "../atoms/TimePicker";
import Icon from "../atoms/Icon";
import IconText from "./IconText";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import Checkbox from "../atoms/Checkbox";
import CheckboxWithText from "./CheckboxWithText";
import {
  disable,
  secondary,
  primary,
  off,
  materialGray,
  lightBlack,
} from "../../utils/colors";

import MuiIconButton from "@material-ui/core/IconButton";
import MuiPaper from "@material-ui/core/Paper";
import MuiFab from "@material-ui/core/Fab";

import Paper from "../atoms/Paper";

import { HandleChange, ChangeInput, ChangeSelect } from "../../utils/types";

import { CarrierSettingsValues } from "../organisms/Carriers";
import { DepotsType } from "../organisms/Depots";

//--styled

const Wrapper = styled.div`
  display: flex;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -110px;
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

const BreakTimeWindowTitleWrapper = styled.div`
  width: ${(props: { width: number }) => props.width + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid ${lightBlack};
`;

const RemoveBreakIconButtonWrapper = styled.div`
  width: 0;
  position: relative;
  right: 15px;
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

const CheckCircleWrapper = styled.div`
  margin-right: 70px;
`;

const AddRowIconButtonWrapper = styled.div`
  margin-left: 100px;
  margin-top: -2px;
`;

const AddSettingTextWrapper = styled.div`
  width: 50px;
  text-align: center;
`;
const AddSettingsButtonWrapper = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 65px;
  left: 40px;
  margin-bottom: 10px;
`;

const DuplicateButtonWrapper = styled.div`
  width: 100px;
  height: 0;
  position: relative;
  top: -55px;
  left: -15px;
`;

//---

type CarrierSettingsRowProps = {
  deleteSettingsRow: () => void;
  carrierSettingsMap: Map<string, CarrierSettingsValues>;
  getHandleChangeSettings: (
    settingItem: string
  ) => HandleChange<ChangeInput | ChangeSelect>;
  depotList: DepotsType;
  enableMultiDepot: boolean;
  isFlexibleCarrierStartTime: boolean;
  duplicateCarrierSettings: (
    carrierSettings: Map<string, CarrierSettingsValues>
  ) => void;
};

const CarrierSettingsRow: VFC<CarrierSettingsRowProps> = ({
  deleteSettingsRow,
  carrierSettingsMap,
  getHandleChangeSettings,
  depotList,
  enableMultiDepot,
  isFlexibleCarrierStartTime,
  duplicateCarrierSettings,
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
  const canInputSkills = carrierSettingsMap.get("canInputSkills") as boolean;

  const carrierCount = carrierSettingsMap.get("carrierCount") as number;
  const driverId = carrierSettingsMap.get("driverId") as string;
  const vehicleId = carrierSettingsMap.get("vehicleId") as string;
  const maxTotalWorkingDuration = carrierSettingsMap.get(
    "maxTotalWorkingDuration"
  ) as any;

  const paperStyle = {
    minWidth: "600px",
    background: isRowChecked ? "" : off,
  };

  const breakCount = carrierSettingsMap.get("breakCount") as number;
  const increaseBreakCount = () =>
    getHandleChangeSettings("breakCount")({
      target: { value: breakCount + 1 },
    } as any) as any;
  const decreaseBreakCount = () =>
    getHandleChangeSettings("breakCount")({
      target: { value: breakCount - 1 },
    } as any) as any;

  const showSkillsSetting = () =>
    getHandleChangeSettings("canInputSkills")({
      target: { value: true },
    } as any);
  const hideSkillsSetting = () =>
    getHandleChangeSettings("canInputSkills")({
      target: { value: false },
    } as any);
  return (
    <Paper elevation={3} {...paperStyle}>
      <DuplicateButtonWrapper>
        <Button
          variant="outlined"
          onClick={() => duplicateCarrierSettings(carrierSettingsMap)}
        >
          <IconText type="ControlPointDuplicate" text="複製" />
        </Button>
      </DuplicateButtonWrapper>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <AddSettingsButtonWrapper>
            <MuiIconButton
              onClick={hideSkillsSetting}
              disabled={!canInputSkills}
            >
              <Icon size="20px" type="RemoveCircleOutline" />
            </MuiIconButton>
            <AddSettingTextWrapper>
              <Text>スキル</Text>
            </AddSettingTextWrapper>
            <MuiIconButton
              onClick={showSkillsSetting}
              disabled={canInputSkills}
            >
              <Icon size="20px" type="AddCircleOutline" />
            </MuiIconButton>
          </AddSettingsButtonWrapper>
          <AddSettingsButtonWrapper>
            <MuiIconButton
              onClick={decreaseBreakCount}
              disabled={breakCount === 0}
            >
              <Icon type="RemoveCircleOutline" size="20px" />
            </MuiIconButton>
            <AddSettingTextWrapper>
              <Text>休憩</Text>
            </AddSettingTextWrapper>
            <MuiIconButton
              onClick={increaseBreakCount}
              disabled={breakCount === 3}
            >
              <Icon size="20px" type="AddCircleOutline" />
            </MuiIconButton>
          </AddSettingsButtonWrapper>
        </div>
      </div>

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
                  (depotInfo) => depotInfo?.id
                )}
                label="出発デポ"
                width={width * 2 + 30}
              />
              <Select
                {...getStringValueAndOnChange("endDepotId")}
                items={[...depotList.keys()]}
                innerValueList={[...depotList.values()].map(
                  (depotInfo) => depotInfo?.id
                )}
                label="帰着デポ"
                width={width * 2 + 30}
              />
            </WithMultiDepot>
          )}
          <MainSettingsWrapper>
            <Select
              value={carrierCount}
              onChange={getHandleChangeSettings("carrierCount")}
              items={carrierCountOptions}
              weight={700}
              width={width}
              label="車両台数"
            />
            <TextField
              {...getStringValueAndOnChange("capacity")}
              type="number"
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
          <MainSettingsWrapper>
            <TextField
              {...getStringValueAndOnChange("acceptableLateness")}
              width={width}
              label="許容超過時間"
              type="number"
              shrink={true}
              end="min"
            />

            <TextField
              value={carrierCount > 1 ? "" : driverId}
              onChange={getHandleChangeSettings("driverId")}
              label="ドライバーID"
              width={width}
              shrink={true}
              disabled={carrierCount > 1}
            />
            <TextField
              {...getStringValueAndOnChange("vehicleId")}
              value={carrierCount > 1 ? "" : vehicleId}
              onChange={getHandleChangeSettings("vehicleId")}
              label="車両ID"
              width={width}
              shrink={true}
              disabled={carrierCount > 1}
            />
            <TextField
              value={!isFlexibleCarrierStartTime ? "" : maxTotalWorkingDuration}
              onChange={getHandleChangeSettings("maxTotalWorkingDuration")}
              width={width}
              label="最大勤務時間"
              type="number"
              shrink={true}
              end="min"
              disabled={!isFlexibleCarrierStartTime}
            />
          </MainSettingsWrapper>
          {canInputSkills && (
            <MainSettingsWrapper>
              <TextField
                {...getStringValueAndOnChange("skill1")}
                label="スキル1"
                width={width}
                shrink={true}
              />
              <TextField
                {...getStringValueAndOnChange("skill2")}
                width={width}
                label="スキル2"
                shrink={true}
              />
              <TextField
                {...getStringValueAndOnChange("skill3")}
                width={width}
                label="スキル3"
                shrink={true}
              />
              <TextField
                {...getStringValueAndOnChange("skill4")}
                label="スキル4"
                width={width}
                shrink={true}
              />
            </MainSettingsWrapper>
          )}

          {breakCount >= 1 && (
            <BreakSettingsWrapper>
              <BreakTimeWindowTitleWrapper width={width}>
                <Text color={lightBlack}>時間枠 ⓵</Text>
              </BreakTimeWindowTitleWrapper>
              <TimePicker
                {...getStringValueAndOnChange("breakReadyTime1")}
                width={width}
                label="休憩開始(可能)"
              />
              <TimePicker
                {...getStringValueAndOnChange("breakDueTime1")}
                width={width}
                label="休憩終了(可能)"
              />
              <TextField
                {...getStringValueAndOnChange("breakDuration")}
                type="number"
                width={width}
                label="休憩時間"
                end="min"
                shrink={true}
              />
            </BreakSettingsWrapper>
          )}
          {breakCount >= 2 && (
            <BreakSettingsWrapper>
              <BreakTimeWindowTitleWrapper width={width}>
                <Text color={lightBlack}>時間枠 ⓶</Text>
              </BreakTimeWindowTitleWrapper>
              <TimePicker
                {...getStringValueAndOnChange("breakReadyTime2")}
                width={width}
                label="休憩開始(可能)"
              />
              <TimePicker
                {...getStringValueAndOnChange("breakDueTime2")}
                width={width}
                label="休憩終了(可能)"
              />
            </BreakSettingsWrapper>
          )}
          {breakCount === 3 && (
            <BreakSettingsWrapper>
              <BreakTimeWindowTitleWrapper width={width}>
                <Text color={lightBlack}>時間枠 ⓷</Text>
              </BreakTimeWindowTitleWrapper>
              <TimePicker
                {...getStringValueAndOnChange("breakReadyTime3")}
                width={width}
                label="休憩開始(可能)"
              />
              <TimePicker
                {...getStringValueAndOnChange("breakDueTime3")}
                width={width}
                label="休憩終了(可能)"
              />
            </BreakSettingsWrapper>
          )}
        </SettingsWrapper>
        <AddRowIconButtonWrapper>
          <MuiIconButton onClick={deleteSettingsRow}>
            <Icon type="DeleteSweep" size="30px" color={materialGray} />
          </MuiIconButton>
        </AddRowIconButtonWrapper>
      </HorizontalWrapper>
    </Paper>
  );
};

export default CarrierSettingsRow;
