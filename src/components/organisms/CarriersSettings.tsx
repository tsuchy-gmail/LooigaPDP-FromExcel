import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CarrierSettingsRow from "../molecules/CarrierSettingsRow";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../atoms/Icon";
import Paper from "../atoms/Paper";
import MuiPaper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import IconText from "../molecules/IconText";

import { ChangeTextFiled, ChangeSelect, HandleChange } from "../../utils/types";

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

export type CarrierSettingsValues = boolean | number | string;

const CarriersSettings = () => {
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

  //-----

  const initialCarrierSetttings = new Map<string, CarrierSettingsValues>([
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

  const [listOfSettingsMap, setListOfSettingsMap] = useState([
    initialCarrierSetttings,
  ]);

  const addRoomOfSettings = () => {
    setListOfSettingsMap([...listOfSettingsMap, initialCarrierSetttings]);
  };

  const deleteSettingsMap = (index: number) => {
    listOfSettingsMap.splice(index, 1);
    setListOfSettingsMap([...listOfSettingsMap]);
  };

  type GetWrappedHandleChange = {
    (index: number): (
      settinItem: string
    ) => (event: ChangeTextFiled | ChangeSelect) => void;
  };

  const getWrappedHandleChangeSettings: GetWrappedHandleChange = (index) => (
    settingItem
  ) => (event) => {
    const newValue = event.target.value;
    //???
    //const isTypeSafe = typof newValue ...  としてif(isTypeSafe)と書いても認識されない
    if (
      typeof newValue === "boolean" ||
      typeof newValue === "string" ||
      typeof newValue === "number"
    )
      listOfSettingsMap[index].set(settingItem, newValue);

    setListOfSettingsMap([...listOfSettingsMap]);
  };
  //-----

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
