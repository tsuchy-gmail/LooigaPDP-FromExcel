import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import CarriersSettings from "./components/organisms/CarriersSettings";
import DatePicker from "./components/atoms/DatePicker";

import ProjectName from "./components/organisms/ProjectName";
import Depots from "./components/organisms/Depots";
import Organizations from "./components/organisms/Organizations";
import IconTextWithInputFileButton from "./components/molecules/IconTextWithInputFileButton";

import MuiButton from "@material-ui/core/Button";
import Paper from "./components/atoms/Paper";
import ExcelImport from "./components/organisms/ExcelImport";
import ProjectDate from "./components/organisms/ProjectDate";

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

  const Wrapper = styled.div`
    padding-top: 20px;
    > * {
      margin-bottom: 0px;
    }
  `;
  return (
    <div style={{ background: "#F4F5F6" }}>
      <Wrapper>
        <ExcelImport />
        <Organizations />
        <Depots />
        <ProjectName />
        <ProjectDate />
        <CarriersSettings />
        <img src={logo} className="App-logo" alt="logo" />
      </Wrapper>
    </div>
  );
}

export default App;
