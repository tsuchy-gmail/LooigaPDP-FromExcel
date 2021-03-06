import { useState, useRef } from "react";
import Carriers, {
  CarrierSettingsValues,
} from "./components/organisms/Carriers";

import ProjectName from "./components/organisms/ProjectName";
import Depots, {
  DepotsType,
  initialDepot,
  initialSelectedDepotName,
} from "./components/organisms/Depots";
import Organizations, {
  initialListOfOrganization,
  initialSelectedOrganization,
  OrganizationsType,
} from "./components/organisms/Organizations";
import { initialProjectName } from "./components/organisms/ProjectName";
import Paper from "./components/atoms/Paper";
import ExcelImport from "./components/organisms/ExcelImport";
import ProjectDate from "./components/organisms/ProjectDate";
import RequestFloatButton from "./components/atoms/RequestFloatButton";
import Options, {
  initialOptionsSettings,
} from "./components/organisms/Options";
import { requestToLoogia } from "./excelImport/excelImport";
import Loader from "react-loader-spinner";
import BackDrop from "@material-ui/core/Backdrop";
import { loogiaBlue, reactColor } from "./utils/colors";
import SnackBar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Text from "./components/atoms/Text";

function App() {
  const enableMultiDepotState = useState(false);

  //Organization info
  const organizationListState = useState(
    new Map(initialListOfOrganization as OrganizationsType)
  );
  const selectedOrganizationState = useState(initialSelectedOrganization);

  //Depots info
  const depotListState = useState(new Map(initialDepot as DepotsType));
  const selectedDepotNameState = useState(initialSelectedDepotName);
  const selectedDepotId =
    (depotListState[0] as any).get(selectedDepotNameState[0])?.id ?? "0";

  //ProjectName info
  const projectNameState = useState(initialProjectName);

  //ExcelImport info
  const excelImportRef = useRef<HTMLInputElement>(null);

  //ProjectDate info
  const projectDateState = useState<Date>(new Date());

  //Carriers info----------------------------------------------------------------
  const initialCarrierSettings = new Map<string, CarrierSettingsValues>([
    ["isRowChecked", true],
    ["carrierCount", 1],
    ["capacity", 200],
    ["startTime", "09:00"],
    ["endTime", "17:00"],
    ["breakCount", 0],
    ["breakReadyTime1", ""],
    ["breakDueTime1", ""],
    ["breakReadyTime2", ""],
    ["breakDueTime2", ""],
    ["breakReadyTime3", ""],
    ["breakDueTime3", ""],
    ["breakDuration", null],
    ["startDepotId", selectedDepotId],
    ["endDepotId", selectedDepotId],
    ["driverId", ""],
    ["vehicleId", ""],
    ["maxTotalWorkingDuration", null],
    ["acceptableLateness", 0],
    ["skill1", ""],
    ["skill2", ""],
    ["skill3", ""],
    ["skill4", ""],
    ["canInputSkills", false],
  ]);

  //?????? ??????parse?????????["[isRowChecked: true]..."]????????????????????????
  //??????????????????????????????parse??????????????????[[isRowChecked: true]...]?????????array in array?????????
  //2?????????parse?????????????????????Map???????????????????????????????????????
  const initialListOfCarrierSettings = localStorage.listOfCarrierSettings
    ? JSON.parse(localStorage.listOfCarrierSettings).map(
        (stringifiedSettings: string) =>
          new Map(JSON.parse(stringifiedSettings))
      )
    : [new Map(initialCarrierSettings)];

  const carrierSettingsListState = useState([...initialListOfCarrierSettings]);
  //-------------------------------------------------------------------Carriers Info

  //Options info
  const optionSettingsMapState = useState(new Map(initialOptionsSettings));

  //
  //
  //
  const organization = organizationListState[0].get(
    selectedOrganizationState[0]
  );
  const depotList = depotListState[0];
  const selectedDepotNameAsMapkey = selectedDepotNameState[0];
  const carreirList = carrierSettingsListState[0];
  const enableMultiDepot = enableMultiDepotState[0];
  const optionMap = optionSettingsMapState[0];

  const isFlexibleCarrierStartTime =
    optionMap.get("isFlexibleCarrierStartTime")?.checked ?? false;

  const projectDate = projectDateState[0];

  const [isRequesting, setIsRequesting] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
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
          selectedDepotNameState={selectedDepotNameState}
        />
        <ProjectName projectNameState={projectNameState} />
        <ProjectDate projectDateState={projectDateState} />
        <Carriers
          carrierSettingsListState={carrierSettingsListState}
          depotList={depotListState[0]}
          selectedDepotName={selectedDepotNameState[0]}
          enableMultiDepotState={enableMultiDepotState}
          isFlexibleCarrierStartTime={isFlexibleCarrierStartTime}
          initialCarrierSettings={initialCarrierSettings}
        />
        <Options optionSettingsMapState={optionSettingsMapState} />
        <RequestFloatButton
          onClick={() => {
            if (!excelImportRef.current?.files?.length) {
              window.alert("Excel???????????????????????????????????????");
              return;
            }
            setIsRequesting(true);
            requestToLoogia(
              organization,
              depotList,
              selectedDepotNameAsMapkey,
              projectNameState[0],
              (excelImportRef as any).current.files[0],
              carreirList,
              enableMultiDepot,
              optionMap,
              projectDate,
              setIsRequesting,
              setShowSuccessSnackbar,
              isFlexibleCarrierStartTime
            );
          }}
        />
        <BackDrop open={isRequesting} style={{ zIndex: 9999 }}>
          <Loader
            type="MutatingDots"
            color={reactColor}
            width={120}
            height={120}
            secondaryColor={reactColor}
          />
        </BackDrop>
        <SnackBar
          autoHideDuration={2000}
          open={showSuccessSnackbar}
          onClose={() => setShowSuccessSnackbar(false)}
        >
          <Alert variant="filled" severity="success">
            <Text weight={700}>Loogia??????????????????????????????????????????</Text>
          </Alert>
        </SnackBar>
      </Paper>
    </div>
  );
}

export default App;
