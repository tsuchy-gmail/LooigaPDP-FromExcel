import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Text from "./components/atoms/Text";
import TextField from "./components/atoms/TextField";
import Button from "./components/atoms/Button";
import Icon from "./components/atoms/Icon";
import IconText from "./components/molecules/IconText";
import { secondary } from "./utils/colors";
import CarrierSettingsRow from "./components/molecules/CarrierSettingsRow";
import styled from "styled-components";
import SubtitleWithSelect from "./components/molecules/IconTextWithSelect";
import InputFile from "./components/atoms/InputFile";
import Checkbox from "./components/atoms/Checkbox";
import DialogButton from "./components/atoms/DialogButton";
import CarriersSettings from "./components/organisms/CarriersSettings";
import CheckboxWithText from "./components/molecules/CheckboxWithText";
import Paper from "./components/atoms/Paper";
import MuiPaper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import DatePicker from "./components/atoms/DatePicker";

import ProjectName from "./components/organisms/ProjectName";
import Depots from "./components/organisms/Depots";
import Organizations from "./components/organisms/Organizations";

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
      <ProjectName />
      <Depots />
      <Organizations />
      <img src={logo} className="App-logo" alt="logo" />
      <DatePicker />
      <CarriersSettings />
    </div>
  );
}

export default App;
