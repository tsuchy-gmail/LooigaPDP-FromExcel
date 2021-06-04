import React from "react";
import styled from "styled-components";

import IconTextWithSelect from "../molecules/IconTextWithSelect";
import TextField from "../atoms/TextField";
import Select from "../atoms/Select";

const RegisterDialogWrapper = styled.div`
  > * {
    margin-bottom: 20px;
  }
`;

type OrganizationsProps = {
  parentRef: React.RefObject<HTMLInputElement>;
  items: string[];
};

const Organizations: React.VFC<Partial<OrganizationsProps>> = ({
  parentRef,
  items,
}) => {
  const registerDialog = (
    <RegisterDialogWrapper>
      <TextField width="600px" label="組織名" weight={400} autoFocus />
      <TextField width="600px" label="App ID" weight={400} />
      <TextField width="600px" label="Api Key" weight={400} />
    </RegisterDialogWrapper>
  );

  const deleteDialog = (
    <div>
      <Select items={items} width="400px" />
    </div>
  );

  return (
    <IconTextWithSelect
      type="Business"
      text="Organizations"
      leftButtonText="組織を登録"
      rightButtonText="組織を削除"
      parentRef={parentRef}
      items={items}
      registerDialog={registerDialog}
      deleteDialog={deleteDialog}
    />
  );
};

export default Organizations;
