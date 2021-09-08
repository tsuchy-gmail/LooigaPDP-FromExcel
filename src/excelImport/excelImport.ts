import { getFormattedCarrierSettingsList } from "./formatCarriersInfo";
import { getMapOfColumnNamAndAlphabet } from "./linkColumnNameWithAlphabet";
import { getFormattedSpotsAndJobs } from "./formatSpotsAndJobsInfo";
import { getFormattedOptions } from "./formatOptionsInfo";
import { request } from "./post";

const xlsx = require("xlsx");
//excelファイルから扱えるデータに変形
const getSheetFromExcelFile = async (excelFile: File) => {
  const buffer = await excelFile.arrayBuffer();
  const book = xlsx.read(buffer, { type: "buffer" });
  const sheetName = book.SheetNames[0];
  const sheet = book.Sheets[sheetName];

  return sheet;
};

export const requestToLoogia = async (
  organization: any,
  depotList: any,
  selectedDepotNameAsMapkey: any,
  projectName: any,
  excelFile: File,
  carrierSettingsList: any,
  enableMultiDepot: boolean,
  optionSettingsMap: any,
  projectDate: Date,
  setIsRequesting: any,
  setShowSuccessSnackbar: any
) => {
  const sheet = await getSheetFromExcelFile(excelFile);
  const mapOfColumnNameAndAlphabet = getMapOfColumnNamAndAlphabet(sheet);

  const name = projectName;
  const carriers = getFormattedCarrierSettingsList(
    carrierSettingsList,
    projectDate,
    enableMultiDepot
  );
  const spotsAndJobs = getFormattedSpotsAndJobs(
    sheet,
    mapOfColumnNameAndAlphabet,
    projectDate
  );
  const spots = spotsAndJobs.get("spots");
  const jobs = spotsAndJobs.get("jobs");
  const option = getFormattedOptions(optionSettingsMap);

  const requestBody = {
    name,
    carriers,
    spots,
    jobs,
    option,
  } as any;

  //depot: {}となるかdepots: []となるか分からないから、後から追加
  if (enableMultiDepot) {
    requestBody["depots"] = [...depotList.values()].map((depotData) => ({
      type: "data",
      data: depotData,
    }));
  } else requestBody["depot"] = depotList.get(selectedDepotNameAsMapkey);

  const requestBodyJson = JSON.stringify(requestBody);

  console.log("requestBody = ", JSON.stringify(requestBody, null, "\t"));
  request(
    organization,
    requestBodyJson,
    enableMultiDepot,
    setIsRequesting,
    setShowSuccessSnackbar
  );
};
