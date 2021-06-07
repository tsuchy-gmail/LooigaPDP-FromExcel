import React, { useState, useEffect } from "react";
import styled from "styled-components";

import IconTextWithSelect from "../molecules/IconTextWithSelect";
import TextField from "../atoms/TextField";
import Select from "../atoms/Select";

import {
  SetState,
  UseState,
  ChangeTextFiled,
  ChangeSelect,
} from "../../utils/types";

type Depots = Map<string, { lat: number; lng: number }>;

type DepotValidation = {
  (name: string, lat: string, lng: string, depotList: Depots): string[];
};

const validateNewDepot: DepotValidation = (name, lat, lng, depotList) => {
  const isAllFilled = !!(name && lat && lng);
  const isNameUnique = !depotList.has(name);

  const alertMessages = [];
  if (!isAllFilled) alertMessages.push("入力に不足があります。");
  if (!isNameUnique) alertMessages.push("既に存在するデポ名です。");
  return alertMessages;
};

const RegisterDialogWrapper = styled.div`
  > * {
    margin-bottom: 20px;
  }
`;

type DepotsProps = {
  depotListState: UseState<Depots>;
  selectedDepotState: UseState<string>;
};

const Depots: React.VFC<DepotsProps> = ({
  depotListState,
  selectedDepotState,
}) => {
  const [depotList, setDepotList] = depotListState;
  const [selectedDepot, setSelectedDepot] = selectedDepotState;

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleChangeName: ChangeTextFiled = (event) => {
    setName(event.target.value);
  };
  const handleChangeLat: ChangeTextFiled = (event) => {
    setLat(event.target.value);
    const e = event.nativeEvent;
    console.log(e);
  };
  const handleChangeLng: ChangeTextFiled = (event) => {
    setLng(event.target.value);
  };

  //MaterialUI-SelectのonChangeの都合?に合わせて<{value: unknown}>にしているため型を断定する必要あり
  const handleChangeSelectedDepot: ChangeSelect = (event) => {
    setSelectedDepot(event.target.value as string);
  };

  const clearAllField = () => {
    setName("");
    setLat("");
    setLng("");
  };

  const validationResult = validateNewDepot(name, lat, lng, depotList);

  const handleRegister = () => {
    const newDepotList = new Map(depotList).set(name, {
      lat: Number(lat),
      lng: Number(lng),
    });
    setDepotList(newDepotList);
    clearAllField();
  };

  //新しいデポがdepotListに登録されてから処理を行いたいためuseEffect
  //登録したらその新しい組織を選択するようにする
  useEffect(() => {
    const lastItem = [...depotList.keys()][depotList.size - 1];
    setSelectedDepot(lastItem);
  }, [depotList]);

  const registerDialog = (
    <RegisterDialogWrapper>
      <TextField
        value={name}
        onChange={handleChangeName}
        width="600px"
        label="デポ名"
        helper="（例）名古屋駅"
        weight={400}
        autoFocus
      />
      <TextField
        value={lat}
        onChange={handleChangeLat}
        width="600px"
        label="lat"
        helper="（例）35.17050"
        weight={400}
        type="number"
      />
      <TextField
        value={lng}
        onChange={handleChangeLng}
        width="600px"
        label="lng"
        helper="（例）136.88193"
        weight={400}
        type="number"
      />
    </RegisterDialogWrapper>
  );

  const deleteDialog = (
    <div>
      <Select items={[...depotList.keys()]} width="400px" />
    </div>
  );

  return (
    <IconTextWithSelect
      type="EmojiTransportation"
      text="Depots"
      leftButtonText="デポを登録"
      rightButtonText="デポを削除"
      items={[...depotList.keys()]}
      registerDialog={registerDialog}
      deleteDialog={deleteDialog}
      alertMessage={validationResult.join("\n")}
      handleRegister={handleRegister}
      value={selectedDepot}
      onChange={handleChangeSelectedDepot}
    />
  );
};

export default Depots;
