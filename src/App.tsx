import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Text from "./components/atoms/Text";
import TextField from "./components/atoms/TextField";
import Button from "./components/atoms/Button";
import Icon from "./components/atoms/Icon";
import { secondary } from "./utils/colors";
import CarrierMainSettingsRow from "./components/molecules/CarrierMainSettings";
import SubtitleWithText from "./components/molecules/SubtitleWithText";
import styled from "styled-components";
import SubtitleWithSelect from "./components/molecules/SubtitleWithSelect";
import InputFile from "./components/atoms/InputFile";
import Checkbox from "./components/atoms/Checkbox";
import DialogButton from "./components/atoms/DialogWithText";

function App() {
  const [date, setDate] = useState(new Date());
  const Grid = styled.div`
    display: grid;
    grid-template-rows: 300px 150px;
    grid-template-columns: 450px 1fr;
    > * {
      margin: 10px;
    }
    grid-template-areas:
      "AreaA AreaB"
      "AreaA AreaC";
  `;

  const [checked, setIsChecked] = React.useState(false);
  const handleChange = () => setIsChecked(!checked);

  return (
    <div style={{ background: "#F4F5F6" }}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <img src={logo} className="App-logo" alt="logo" />
      <DialogButton actionText="デポを登録">
        <TextField width={800} />
      </DialogButton>

      <Checkbox />
      <div>
        <b>Hello, TypeScript!</b>
      </div>
      <InputFile id="test">fo!</InputFile>
      <CarrierMainSettingsRow />
      <TextField end="(min)" size="20px" weight={700} />
      <SubtitleWithSelect />
      <Button variant="contained" color={secondary} width={500} height={200}>
        <Text size="20px" weight={700}>
          Buttonの中のText
        </Text>
      </Button>
      <SubtitleWithText />
    </div>
  );
}

export default App;
