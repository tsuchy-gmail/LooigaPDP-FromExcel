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

type OrganizationValidation = {
  (name: string, id: string, key: string, organizationList: Organizations): [
    boolean,
    string[]
  ];
};

const validateEveryField: OrganizationValidation = (name, id, key, organizationList) => {
  const isAllFilled = !!(name && id && key);
  const isNameUnique = !organizationList.has(name);
  const isIdUnique = ![...organizationList.values()].some(
    (idAndKey) => idAndKey["AppId"] === id
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

  const canRegister = !!(
    isAllFilled &&
    isNameUnique &&
    isIdUnique &&
    isKeyUnique
  );

  return [canRegister, alertMessages];
};



const RegisterDialogWrapper = styled.div`
  > * {
    margin-bottom: 20px;
  }
`;

type Organizations = Map<string, { AppId: string; ApiKey: string }>;

type OrganizationsProps = {
  organizationListState: UseState<Organizations>;
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

  const handleChangeName: ChangeTextFiled = (event) => {
    setName(event.target.value);
  };
  const handleChangeId: ChangeTextFiled = (event) => {
    setId(event.target.value);
  };
  const handleChangeKey: ChangeTextFiled = (event) => {
    setKey(event.target.value);
  };

  //MaterialUI-SelectのonChangeの都合?に合わせて<{value: unknown}>にしているため型を断定する必要あり
  const handleChangeSelectedValue: ChangeSelect = (event) => {
    setSelectedOrganization(event.target.value as string);
  };

  const clearAllField = () => {
    setName("");
    setId("");
    setKey("");
  };

  const [canRegister, alertMessages] = validateEveryField(
    name,
    id,
    key,
    organizationList
  );


  const handleRegister = () => {
    const newOrganizationsList = new Map(organizationList).set(name, {
      AppId: id,
      ApiKey: key,
    });

    setOrganizationsList(newOrganizationsList);
    clearAllField();
  };

  //新しい組織がorganizationListに登録されてから処理を行いたいためuseEffect
  //登録したらその新しい組織を選択するようにする
  useEffect(() => {
    const lastItem = [...organizationList.keys()][organizationList.size - 1];
    setSelectedOrganization(lastItem);
  }, [organizationList]);

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
      <Select items={[...organizationList.keys()]} width="400px" />
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
      canRegister={canRegister}
      alertMessage={alertMessages.join("\n")}
      handleRegister={handleRegister}
      onChange={handleChangeSelectedValue}
    />
  );
};

export default Organizations;