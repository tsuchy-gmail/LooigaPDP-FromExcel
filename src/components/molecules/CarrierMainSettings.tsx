import React, { VFC } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import TextField from "../atoms/TextField";
import TimePicker from "../atoms/TimePicker";

const Wrapper = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
`;

const carrierCountOptions = [...new Array(50).keys()].map((count) => count + 1); //[1,2,3,.....50]

const CarrierMainSettingsRow: VFC = () => {
  const width = 100;
  return (
    <Wrapper>
      <Select
        items={carrierCountOptions}
        width={width}
        label="車両台数"
        weight={700}
      />
      <TextField width={width} label="積載容量" weight={700} />
      <TimePicker width={width} label="出発時刻" weight={700} />
      <TimePicker width={width} label="帰着時刻" weight={700} />
    </Wrapper>
  );
};

export default CarrierMainSettingsRow;
