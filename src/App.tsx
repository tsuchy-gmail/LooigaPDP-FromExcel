import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import Carriers, {
  initialSettingsData,
  initialCarrierSettings,
} from "./components/organisms/Carriers";
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
import MuiSelect from "@material-ui/core/Select";
import Select from "./components/atoms/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import CheckboxWithText from "./components/molecules/CheckboxWithText";
import MuiRadio from "@material-ui/core/Radio";
import Radio from "./components/atoms/Radio";
import Text from "./components/atoms/Text";
import OptionSettingsRow from "./components/molecules/OptionSettingsRow";
import TextWithSelect from "./components/molecules/TextWithSelect";
import Options, {
  initialOptionsSettings,
} from "./components/organisms/Options";

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
  const carrierSettingsListState = useState([new Map(initialCarrierSettings)]);

  //Options info
  const optionSettingsListState = useState(new Map(initialOptionsSettings));

  const option = (
    <Paper
      elevation={2}
      width="50%"
      display="flex"
      padding="10px"
      margin="30px auto"
    >
      <CheckboxWithText>高速を許可</CheckboxWithText>
    </Paper>
  );
  const se = { fontWeight: 700 };
  const si = { fontWeight: 600 };
  const fi = { fontWeight: 500 };
  const fo = { fontWeight: 400 };
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
        <Carriers carrierSettingsListState={carrierSettingsListState} />
        <RequestFloatButton />
        <Options optionSettingsListState={optionSettingsListState} />
      </Paper>
    </div>
  );
}

export default App;
