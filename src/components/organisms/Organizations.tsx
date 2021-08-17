import { useState, useEffect, useRef } from "react";
import * as React from "react";
import styled from "styled-components";

import IconTextWithSelect from "../molecules/IconTextWithSelect";
import TextField from "../atoms/TextField";
import Select from "../atoms/Select";
import { tsuchyDev } from "../../organizationsData";
import {
  SetState,
  UseState,
  ChangeInput,
  ChangeSelect,
  HandleChange,
} from "../../utils/types";

export type OrganizationsType = Map<
  string,
  { name: string; AppID: string; ApiKey: string }
>;

type OrganizationValidation = {
  (
    name: string,
    id: string,
    key: string,
    organizationList: OrganizationsType
  ): string[];
};

const validateNewOrganization: OrganizationValidation = (
  name,
  id,
  key,
  organizationList
) => {
  const isAllFilled = !!(name && id && key);
  const isNameUnique = !organizationList.has(name);
  const isIdUnique = ![...organizationList.values()].some(
    (idAndKey) => idAndKey["AppID"] === id
  );
  const isKeyUnique = ![...organizationList.values()].some(
    (idAndKey) => idAndKey["ApiKey"] === key
  );

  const alertMessages = [];
  const templeteMessage = (item: string) => `既に存在している${item}です。`;
  if (!isAllFilled) alertMessages.push("入力に不足があります。");
  if (!isNameUnique) alertMessages.push(templeteMessage("組織名"));
  if (!isIdUnique) alertMessages.push(templeteMessage("App ID"));
  if (!isKeyUnique) alertMessages.push(templeteMessage("Api Key"));

  return alertMessages;
};

export const initialListOfOrganization = localStorage.organizationList
  ? new Map(JSON.parse(localStorage.organizationList))
  : new Map([
      [
        "dev",
        { name: "dev", AppID: tsuchyDev.AppID, ApiKey: tsuchyDev.ApiKey },
      ],
    ]);

export const initialSelectedOrganization = localStorage.selectedOrganization
  ? JSON.parse(localStorage.selectedOrganization)
  : "dev";

const RegisterDialogWrapper = styled.div`
  > * {
    margin-bottom: 20px;
  }
`;

type OrganizationsProps = {
  organizationListState: UseState<OrganizationsType>;
  selectedOrganizationState: UseState<string>;
};

const Organizations: React.VFC<OrganizationsProps> = ({
  organizationListState,
  selectedOrganizationState,
}) => {
  const [organizationList, setOrganizationsList] = organizationListState;
  const [
    selectedOrganization,
    setSelectedOrganization,
  ] = selectedOrganizationState;
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [key, setKey] = useState("");

  const [deletingOrganizationName, setDeletingOrganizationName] = useState(
    organizationList.size >= 1 ? [...organizationList.keys()][0] : ""
  );

  const handleChangeName: HandleChange<ChangeInput> = (event) => {
    setName(event.target.value);
  };
  const handleChangeId: HandleChange<ChangeInput> = (event) => {
    setId(event.target.value);
  };
  const handleChangeKey: HandleChange<ChangeInput> = (event) => {
    setKey(event.target.value);
  };

  const handleChangeDeletingOrganizationName = (event: any) => {
    setDeletingOrganizationName(event.target.value);
  };

  const handleDelete = () => {
    organizationList.delete(deletingOrganizationName);
    setOrganizationsList(new Map(organizationList));
  };

  //MaterialUI-SelectのonChangeの都合?に合わせて<{value: unknown}>にしているため型を決める必要あり
  const handleChangeSelectedOrganization: HandleChange<ChangeSelect> = (
    event
  ) => {
    const selectedValue = event.target.value;
    if (typeof selectedValue === "string")
      setSelectedOrganization(selectedValue);
  };

  const clearAllField = () => {
    setName("");
    setId("");
    setKey("");
  };

  const validationResult = validateNewOrganization(
    name,
    id,
    key,
    organizationList
  );

  const handleRegister = () => {
    const newOrganizationsList = new Map(organizationList).set(name, {
      name,
      AppID: id,
      ApiKey: key,
    });

    setOrganizationsList(newOrganizationsList);
    clearAllField();
  };

  const organizationListSizeRef = useRef(organizationList.size);
  useEffect(() => {
    //localStorageに追加
    localStorage.organizationList = JSON.stringify([...organizationList]);

    //新しい組織がorganizationListに登録されてから処理を行いたいためuseEffect
    //登録したらその新しい組織を選択するようにする
    if (organizationList.size > organizationListSizeRef.current) {
      const lastItem = [...organizationList.keys()][organizationList.size - 1];
      setSelectedOrganization(lastItem);

      organizationListSizeRef.current++;
    }
    if (organizationList.size < organizationListSizeRef.current) {
      organizationListSizeRef.current--;
    }
  }, [organizationList]);

  useEffect(() => {
    localStorage.selectedOrganization = JSON.stringify(selectedOrganization);
  }, [selectedOrganization]);

  const registerDialog = (
    <RegisterDialogWrapper>
      <TextField
        value={name}
        onChange={handleChangeName}
        width="600px"
        label="組織名"
        weight={400}
        autoFocus
      />
      <TextField
        onChange={handleChangeId}
        value={id}
        width="600px"
        label="App ID"
        weight={400}
      />
      <TextField
        value={key}
        onChange={handleChangeKey}
        width="600px"
        label="Api Key"
        weight={400}
      />
    </RegisterDialogWrapper>
  );

  const deleteDialog = (
    <div>
      <Select
        items={[...organizationList.keys()]}
        value={deletingOrganizationName}
        onChange={handleChangeDeletingOrganizationName}
        width="400px"
      />
    </div>
  );

  return (
    <IconTextWithSelect
      items={[...organizationList.keys()]}
      type="Business"
      text="Organizations"
      leftButtonText="組織を登録"
      rightButtonText="組織を削除"
      registerDialog={registerDialog}
      deleteDialog={deleteDialog}
      value={selectedOrganization}
      alertMessage={validationResult.join("\n")}
      handleRegister={handleRegister}
      handleDelete={handleDelete}
      onChange={handleChangeSelectedOrganization}
    />
  );
};

export default React.memo(Organizations);
