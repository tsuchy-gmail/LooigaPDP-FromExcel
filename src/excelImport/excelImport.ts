import { getFormattedCarrierSettingsList } from "./formatCarriersInfo";
import { getMapOfColumnNamAndAlphabet } from "./linkColumnNameWithAlphabet";
import { getFormattedSpotsAndJobs } from "./formatSpotsAndJobsInfo";
import { getFormattedOptions } from "./formatOptionsInfo";
import { request } from "./post";

const xlsx = require("xlsx");
console.log("xlsx =", xlsx);
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
  optionSettingsMap: any,
  ProjectDate?: any
) => {
  console.log("requestToLoogia -------");
  const sheet = await getSheetFromExcelFile(excelFile);
  console.log("SHEET  =", sheet);
  const mapOfColumnNameAndAlphabet = getMapOfColumnNamAndAlphabet(sheet);
  console.log("mapOfAlphabet = ", mapOfColumnNameAndAlphabet);

  const name = projectName;
  console.log("projectName = ", name);
  const enableMultiDepot = carrierSettingsList.some((carrierSettings: any) =>
    carrierSettings.get("enableMultiDepot")
  );
  const carriers = getFormattedCarrierSettingsList(carrierSettingsList);
  console.log("carriers = ", carriers);
  const spots = getFormattedSpotsAndJobs(sheet, mapOfColumnNameAndAlphabet).get(
    "spots"
  );
  console.log("spots = ", spots);
  const jobs = getFormattedSpotsAndJobs(sheet, mapOfColumnNameAndAlphabet).get(
    "jobs"
  );
  console.log("jobs = ", jobs);
  const option = getFormattedOptions(optionSettingsMap);
  console.log("option = ", option);

  const requestBody = {
    name,
    carriers,
    spots,
    jobs,
    option,
  } as any;

  if (enableMultiDepot) {
    requestBody["depots"] = [...depotList.values()].map((depotData) => ({
      type: "data",
      data: depotData,
    }));
  } else requestBody["depot"] = depotList.get(selectedDepotNameAsMapkey);

  const requestBodyJson = JSON.stringify(requestBody);

  console.log("requestBody = ", requestBody);
  console.log("requestBodyJSON = ", JSON.stringify(requestBody, null, "\t"));
  console.log("--------requestToLoogia ");

  request(organization, requestBodyJson, enableMultiDepot);
};
