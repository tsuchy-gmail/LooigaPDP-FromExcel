import { useState, useEffect, useRef } from "react";
import * as React from "react";
import styled from "styled-components";

import IconTextWithSelect from "../molecules/IconTextWithSelect";
import TextField from "../atoms/TextField";
import Select from "../atoms/Select";

import {
  SetState,
  UseState,
  ChangeInput,
  ChangeSelect,
  HandleChange,
} from "../../utils/types";

export type DepotsType = Map<
  string,
  { name: string; id: string; geocode: { lat: number; lng: number } }
>;

type DepotValidation = {
  (name: string, lat: string, lng: string, depotList: DepotsType): string[];
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

//デポ名に重複が無いようvalidationをかけたいため,デポ名をkeyとする
//'名古屋駅' という入力がある時depotList.has('名古屋駅')としたい
export const initialDepot = localStorage.depotList
  ? new Map(JSON.parse(localStorage.depotList))
  : new Map([
      [
        "名古屋駅",
        {
          name: "名古屋駅",
          id: "0",
          geocode: { lat: 35.1705, lng: 136.88193 },
        },
      ],
    ]);

export const initialSelectedDepotName = localStorage.selectedDepotName
  ? JSON.parse(localStorage.selectedDepotName)
  : "名古屋駅";

type DepotsProps = {
  depotListState: UseState<DepotsType>;
  selectedDepotNameState: UseState<string>;
};

const Depots: React.VFC<DepotsProps> = ({
  depotListState,
  selectedDepotNameState,
}) => {
  const [depotList, setDepotList] = depotListState;
  const [selectedDepot, setSelectedDepot] = selectedDepotNameState;

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleChangeName: HandleChange<ChangeInput> = (event) => {
    setName(event.target.value);
  };
  const handleChangeLat: HandleChange<ChangeInput> = (event) => {
    setLat(event.target.value);
    const e = event.nativeEvent;
  };
  const handleChangeLng: HandleChange<ChangeInput> = (event) => {
    setLng(event.target.value);
  };

  //MaterialUI-SelectのonChangeの都合?に合わせて<{value: unknown}>にしているため型を決める必要あり
  const handleChangeSelectedDepot: HandleChange<ChangeSelect> = (event) => {
    const selectedValue = event.target.value;
    if (typeof selectedValue === "string") setSelectedDepot(selectedValue);
  };

  const clearAllField = () => {
    setName("");
    setLat("");
    setLng("");
  };

  const validationResult = validateNewDepot(name, lat, lng, depotList);

  const handleRegister = () => {
    const newDepotList = new Map(depotList).set(name, {
      name,
      id: String(depotList.size),
      geocode: { lat: Number(lat), lng: Number(lng) },
    });
    setDepotList(newDepotList);
    clearAllField();
  };

  const handleDelete = () => {};

  const depotListSizeRef = useRef(depotList.size);
  useEffect(() => {
    //localStorageに保存
    localStorage.depotList = JSON.stringify([...depotList]);

    //登録したらその新しい組織を選択するようにする
    //新しいデポがdepotListに登録されてから処理を行いたいためuseEffect

    if (depotList.size > depotListSizeRef.current) {
      const lastItem = [...depotList.keys()][depotList.size - 1];
      setSelectedDepot(lastItem);

      depotListSizeRef.current++;
    }
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

export default React.memo(Depots);
