import React, { useState, useRef } from "react";
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
import Paper from "components/atoms/Paper";
import ExcelImport from "./components/organisms/ExcelImport";
import ProjectDate from "./components/organisms/ProjectDate";

function App() {
  const projectNameRef = useRef<HTMLInputElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const depotsRef = useRef<HTMLInputElement>(null);
  const excelImportRef = useRef<HTMLInputElement>(null);
  const log = () => {
    if (excelImportRef.current?.files)
      console.log(excelImportRef.current.files[0]);
    else console.log("current is null");
  };
  const organizations = ["オプティ", "土運輸", "佐川急便"];

  return (
    <div style={{ background: "#F4F5F6" }}>
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          console.log("target = ", event.target);
          console.log("currentTarget = ", event.currentTarget);
        }}
      >
        parent
        <button>innerButton</button>
      </div>
      <MuiButton onClick={log}>Ref</MuiButton>
      <ExcelImport parentRef={excelImportRef} />
      <Organizations items={organizations} parentRef={organizationRef} />
      <Depots parentRef={depotsRef} items={organizations} />
      <ProjectName parentRef={projectNameRef} />
      <ProjectDate />
      <CarriersSettings />
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
