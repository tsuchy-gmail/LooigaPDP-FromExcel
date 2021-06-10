import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import CarriersSettings, {
  initialSettingsData,
} from "./components/organisms/CarriersSettings";
import DatePicker from "./components/atoms/DatePicker";

import ProjectName from "./components/organisms/ProjectName";
import Depots from "./components/organisms/Depots";
import Organizations from "./components/organisms/Organizations";
import IconTextWithInputFileButton from "./components/molecules/IconTextWithInputFileButton";
import MuiTextField from "@material-ui/core/TextField";

import MuiButton from "@material-ui/core/Button";
import Paper from "./components/atoms/Paper";
import ExcelImport from "./components/organisms/ExcelImport";
import ProjectDate from "./components/organisms/ProjectDate";
import { organizationsList } from "./organizationsData";
import RequestFloatButton from "./components/atoms/RequestFloatButton";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

const { myorgProd, myorgDev } = organizationsList;

function App() {
  //Organization info
  const organizationListState = useState(
    new Map([["dev", { AppId: myorgDev.AppID, ApiKey: myorgDev.ApiKey }]])
  );
  const selectedOrganizationState = useState("");

  //Depots info
  const depotListState = useState(
    new Map([["名古屋駅", { lat: 35.1705, lng: 136.88193 }]])
  );
  const selectedDepotState = useState("");

  //ProjectName info
  const projectNameRef = useRef<HTMLInputElement>(null);

  //ExcelImport info
  const excelImportRef = useRef<HTMLInputElement>(null);

  //ProjectDate info
  const projectDateState = useState<Date | null>(new Date());

  //Carriers info
  const carrierSettingsListState = useState([new Map(initialSettingsData)]);

  return (
    <div style={{ background: "#F4F5F6", padding: "30px 0" }}>
      <Paper elevation={2}>
        <ExcelImport parentRef={excelImportRef} />
        <Organizations
          organizationListState={organizationListState}
          selectedOrganizationState={selectedOrganizationState}
        />
        <Depots
          depotListState={depotListState}
          selectedDepotState={selectedDepotState}
        />
        <ProjectName parentRef={projectNameRef} />
        <ProjectDate projectDateState={projectDateState} />
        <CarriersSettings carrierSettingsListState={carrierSettingsListState} />
        <RequestFloatButton />
      </Paper>
    </div>
  );
}

export default App;
