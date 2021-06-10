import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CarrierSettingsRow from "../molecules/CarrierSettingsRow";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../atoms/Icon";
import Paper from "../atoms/Paper";
import MuiPaper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import IconText from "../molecules/IconText";

import {
  ChangeInput,
  ChangeSelect,
  HandleChange,
  UseState,
} from "../../utils/types";

//---styled
const ContentsWrapper = styled.div`
  width: 1030px;
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

//initial data  for each row
export const initialSettingsData = new Map<string, CarrierSettingsValues>([
  ["isRowChecked", true],
  ["carrierCount", 10],
  ["capacity", 200],
  ["departureTime", "09:00"],
  ["arrivalTime", "17:00"],
  ["enableBreak", false],
  ["breakReadyTime", "12:00"],
  ["breakDueTime", "14:00"],
  ["breakDuration", 60],
]);

export type CarrierSettingsValues = boolean | number | string;

type CarriersProps = {
  carrierSettingsListState: UseState<Map<string, CarrierSettingsValues>[]>;
};

const CarriersSettings: React.VFC<CarriersProps> = ({
  carrierSettingsListState,
}) => {
  console.log("Carrier");
  //---rows for view
  const [carrierSettingsRows, setCarrierSettingsRows] = useState([
    CarrierSettingsRow,
  ]);

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
    setListOfSettingsMap([...listOfSettingsMap, new Map(initialSettingsData)]);
  };

  const deleteSettingsMap = (index: number) => {
    listOfSettingsMap.splice(index, 1);
    setListOfSettingsMap([...listOfSettingsMap]);
  };
  //---

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
      const newValue = event.target.value;
      if (typeof newValue === "string" || typeof newValue === "number") {
        listOfSettingsMap[index].set(settingItem, newValue);
        setListOfSettingsMap([...listOfSettingsMap]);
      }
    }
  };
  //---

  return (
    <Paper width="93%" margin="0 auto">
      <IconText type="LocalShipping" text="Carriers" />
      <ContentsWrapper>
        <CarrierSettingsRowsWrapper>
          {carrierSettingsRows.map((Row, index) => (
            <Row
              deleteSettingsRow={() => deleteSettingsRow(index)}
              key={index}
              carrierSettingsMap={listOfSettingsMap[index]}
              getHandleChangeSettings={getWrappedHandleChangeSettings(index)}
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

export default CarriersSettings;
