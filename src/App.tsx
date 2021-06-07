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
import Paper from "./components/atoms/Paper";
import ExcelImport from "./components/organisms/ExcelImport";
import ProjectDate from "./components/organisms/ProjectDate";
import { organizationsList } from "./organizationsData";

const { myorgProd, myorgDev } = organizationsList;

function App() {
  const projectNameRef = useRef<HTMLInputElement>(null);
  console.log("Org");
  //organization info

  const organizationListState = useState(
    new Map([
      ["土本運輸dev", { AppId: myorgDev.AppID, ApiKey: myorgDev.ApiKey }],
    ])
  );
  const selectedOrganizationState = useState("");

  //
  const depotsRef = useRef<HTMLInputElement>(null);
  const excelImportRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ background: "#F4F5F6" }}>
      <ExcelImport parentRef={excelImportRef} />
      <Organizations
        organizationListState={organizationListState}
        selectedOrganizationState={selectedOrganizationState}
      />
      <Depots parentRef={depotsRef} />
      <ProjectName parentRef={projectNameRef} />
      <ProjectDate />
      <CarriersSettings />
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
