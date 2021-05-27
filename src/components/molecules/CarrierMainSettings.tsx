import React, { VFC } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import TextField from "../atoms/TextField";
import TimePicker from "../atoms/TimePicker";

const Wrapper = styled.div`
  width: 460px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
`;

const carrierCountOptions = [...new Array(50).keys()].map((count) => count + 1);//[1,2,3,.....50]

const CarrierMainSettingsRow: VFC = () => {
  const width = 100;
  return (
    <Wrapper>
      <Select items={carrierCountOptions} width={width} label="車両台数" />
      <TextField width={width} label="積載容量" />
      <TimePicker width={width} label="出発時刻" />
      <TimePicker width={width} label="帰着時刻" />
    </Wrapper>
  );
};

export default CarrierMainSettingsRow;
