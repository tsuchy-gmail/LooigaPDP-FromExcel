import { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import Carriers, {
  initialCarrierSettings,
} from "./components/organisms/Carriers";
import DatePicker from "./components/atoms/DatePicker";

import ProjectName from "./components/organisms/ProjectName";
import Depots, { initialDepot } from "./components/organisms/Depots";
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
import { requestToLoogia } from "./excelImport/excelImport";

const { myorgProd, myorgDev } = organizationsList;

function App() {
  //Organization info
  const organizationListState = useState(
    new Map([["dev", { AppID: myorgDev.AppID, ApiKey: myorgDev.ApiKey }]])
  );
  const selectedOrganizationState = useState("");

  //Depots info
  const depotListState = useState(new Map(initialDepot));
  const selectedDepotState = useState("");
  console.log(selectedDepotState[0]);

  //ProjectName info
  const projectNameRef = useRef<HTMLInputElement>(null);

  //ExcelImport info
  const excelImportRef = useRef<HTMLInputElement>(null);

  //ProjectDate info
  const projectDateState = useState<Date | null>(new Date());

  //Carriers info
  const carrierSettingsListState = useState(
    localStorage.listOfSettingsMap
      ? JSON.parse(localStorage.listOfSettingsMap)
      : [new Map(initialCarrierSettings)]
  );

  //Options info
  const optionSettingsMapState = useState(new Map(initialOptionsSettings));

  //
  //
  //
  const organization = organizationListState[0].get(
    selectedOrganizationState[0]
  );
  console.log("App.tsx -------");
  console.log("org = ", organization);
  const depotList = depotListState[0];
  const selectedDepotNameAsMapkey = selectedDepotState[0];
  console.log("depotList = ", depotList);
  const projectName = projectNameRef.current?.value;
  console.log("projectName = ", projectName);
  const carreirList = carrierSettingsListState[0];
  console.log("carreirList", carreirList);
  const optionMap = optionSettingsMapState[0];
  console.log("optionMap = ", optionMap);
  console.log("excelImportRef = ", excelImportRef.current?.files);
  console.log("------App.tsx");

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
        <Carriers
          carrierSettingsListState={carrierSettingsListState}
          depotList={depotListState[0]}
        />
        <RequestFloatButton
          onClick={() => {
            if (!excelImportRef.current?.files?.length) {
              window.alert("Excelファイルを選択して下さい。");
              return;
            }
            requestToLoogia(
              organization,
              depotList,
              selectedDepotNameAsMapkey,
              projectNameRef.current?.value,
              (excelImportRef as any).current.files[0],
              carreirList,
              optionMap
            );
          }}
        />
        <Options optionSettingsMapState={optionSettingsMapState} />
      </Paper>
    </div>
  );
}

export default App;
