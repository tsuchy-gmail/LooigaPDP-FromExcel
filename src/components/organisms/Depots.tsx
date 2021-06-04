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

type DepotsProps = {
  items: string[];
  parentRef: React.RefObject<HTMLInputElement>;
};

const Depots: React.VFC<Partial<DepotsProps>> = ({ items, parentRef }) => {
  const registerDialog = (
    <RegisterDialogWrapper>
      <TextField
        width="600px"
        label="デポ名"
        helper="（例）名古屋駅"
        weight={400}
        autoFocus
      />
      <TextField
        width="600px"
        label="lat"
        helper="（例）35.17050"
        weight={400}
      />
      <TextField
        width="600px"
        label="lng"
        helper="（例）136.88193"
        weight={400}
      />
    </RegisterDialogWrapper>
  );

  const deleteDialog = (
    <div>
      <Select items={items} width="400px" />
    </div>
  );

  return (
    <IconTextWithSelect
      type="EmojiTransportation"
      text="Depots"
      leftButtonText="デポを登録"
      rightButtonText="デポを削除"
      items={items}
      parentRef={parentRef}
      registerDialog={registerDialog}
      deleteDialog={deleteDialog}
    />
  );
};

export default Depots;
