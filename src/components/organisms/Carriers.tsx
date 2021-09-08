import { useState, useEffect } from "react";
import * as React from "react";
import styled from "styled-components";

import CarrierSettingsRow from "../molecules/CarrierSettingsRow";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../atoms/Icon";
import Paper from "../atoms/Paper";
import CheckboxWithText from "../molecules/CheckboxWithText";
import MuiPaper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import IconText from "../molecules/IconText";
import Switch from "@material-ui/core/Switch";
import Text from "../atoms/Text";

import {
  ChangeInput,
  ChangeSelect,
  HandleChange,
  UseState,
} from "../../utils/types";
import { DepotsType } from "./Depots";

//---styled

const UpperSide = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentsWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
`;

const IconButtonWrapper = styled.div`
  text-align: center;
`;
const CarrierSettingsRowsWrapper = styled.div`
  margin-top: 50px;
  > * {
    margin-bottom: 30px;
  }
`;
//---

//initial data for each row

//

export type CarrierSettingsValues = boolean | number | string;

type CarriersProps = {
  carrierSettingsListState: UseState<Map<string, CarrierSettingsValues>[]>;
  initialCarrierSettings: Map<string, CarrierSettingsValues>;
  depotList: DepotsType;
  selectedDepotName: string;
  enableMultiDepotState: UseState<boolean>;
  isFlexibleCarrierStartTime: boolean;
};

const Carriers: React.VFC<CarriersProps> = ({
  carrierSettingsListState,
  initialCarrierSettings,
  depotList,
  enableMultiDepotState,
  isFlexibleCarrierStartTime,
}) => {
  //---rows for view
  const [carrierSettingsRows, setCarrierSettingsRows] = useState(
    localStorage.carrierSettingsRowsCount
      ? [...new Array(JSON.parse(localStorage.carrierSettingsRowsCount))].fill(
          CarrierSettingsRow
        )
      : [CarrierSettingsRow]
  );
  const [enableMultiDepot, setEnableMultiDepot] = enableMultiDepotState;

  const addSettingsRow = () => {
    setCarrierSettingsRows((currentRows) => [
      ...currentRows,
      CarrierSettingsRow,
    ]);
    addRoomOfSettings();
  };

  const deleteSettingsRow = (index: number) => {
    setCarrierSettingsRows((currentRows) => {
      const newRows = currentRows.slice();
      newRows.splice(index, 1);
      return [...newRows];
    });
    deleteSettingsMap(index);
  };
  //---

  //---handling data for each row

  const [listOfSettingsMap, setListOfSettingsMap] = carrierSettingsListState;

  const addRoomOfSettings = () => {
    setListOfSettingsMap([
      ...listOfSettingsMap,
      new Map(initialCarrierSettings),
    ]);
  };
  const duplicateCarrierSettings = (
    carrierSettings: Map<string, CarrierSettingsValues>
  ) => {
    setCarrierSettingsRows((currentRows) => [
      ...currentRows,
      CarrierSettingsRow,
    ]);
    setListOfSettingsMap([...listOfSettingsMap, new Map(carrierSettings)]);
  };

  const deleteSettingsMap = (index: number) => {
    listOfSettingsMap.splice(index, 1);
    setListOfSettingsMap([...listOfSettingsMap]);
  };
  //---

  useEffect(() => {
    //localStorageに保存
    const carrierSettingsRowsCount = carrierSettingsRows.length;
    localStorage.carrierSettingsRowsCount = JSON.stringify(
      carrierSettingsRowsCount
    );
  }, [carrierSettingsRows]);

  useEffect(() => {
    //MapオブジェクトがJSON.stringifyで{}になってしまうから、arrayに一度変換してからstringifyする
    //まずは配列の中のMapをstringify
    const listOfSettingsMapStringified = listOfSettingsMap.map((settingsMap) =>
      JSON.stringify([...settingsMap])
    );
    //配列をstringify
    localStorage.listOfCarrierSettings = JSON.stringify(
      listOfSettingsMapStringified
    );
  }, [listOfSettingsMap]);

  //--- 一つの関数にまとめたい - mapする時にpropsとして渡しやすい
  type GetWrappedHandleChange = {
    (index: number): (
      settinItem: string
    ) => (event: ChangeInput | ChangeSelect) => void;
  };

  const getWrappedHandleChangeSettings: GetWrappedHandleChange = (index) => (
    settingItem
  ) => (event) => {
    const targetAsInputElement = event.target as HTMLInputElement;
    if (targetAsInputElement.type === "checkbox") {
      listOfSettingsMap[index].set(settingItem, targetAsInputElement.checked);
      setListOfSettingsMap([...listOfSettingsMap]);
    } else {
      const newValue = event.target.value as any;
      listOfSettingsMap[index].set(settingItem, newValue);
      setListOfSettingsMap([...listOfSettingsMap]);
    }
  };
  //---

  return (
    <Paper width="93%" margin="0 auto">
      <UpperSide>
        <IconText type="LocalShipping" text="Carriers" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>マルチデポ</Text>
          <Switch
            color="primary"
            checked={enableMultiDepot}
            onChange={() => setEnableMultiDepot(!enableMultiDepot)}
          />
        </div>
      </UpperSide>
      <ContentsWrapper>
        <CarrierSettingsRowsWrapper>
          {carrierSettingsRows.map((Row, index) => (
            <Row
              deleteSettingsRow={() => deleteSettingsRow(index)}
              key={index}
              carrierSettingsMap={listOfSettingsMap[index]}
              getHandleChangeSettings={getWrappedHandleChangeSettings(index)}
              depotList={depotList}
              enableMultiDepot={enableMultiDepot}
              isFlexibleCarrierStartTime={isFlexibleCarrierStartTime}
              duplicateCarrierSettings={duplicateCarrierSettings}
            />
          ))}
        </CarrierSettingsRowsWrapper>
        <IconButtonWrapper>
          <Fab onClick={addSettingsRow} color="primary">
            <Icon size="40px" type="Add" />
          </Fab>
        </IconButtonWrapper>
      </ContentsWrapper>
    </Paper>
  );
};

export default React.memo(Carriers);
