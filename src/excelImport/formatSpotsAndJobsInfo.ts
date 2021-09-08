//jsのMapオブジェクトを使い、spotが新しいものか既出のものかを判定する
//
//緯度経度の文字列を連結したものを比較して判定する ( 35.99999136.99999 という具合 )
//
//[["35.99999136.99999", '0']...]というMapがある時
//
//Mapのhasメソッドを使いhas('35.99999136.99999')としてこれがtrueであればそのjobのspotIdは'0'となる

import { getISODateFromDateAndTime } from "../utils/date";

export const getFormattedSpotsAndJobs: any = (
  sheet: any,
  mapOfColumnNameAndAlphabet: any,
  projectDate: Date
) => {
  const rowNumberFromRefData = Number(sheet["!ref"].replace(/^...../, ""));
  if (!rowNumberFromRefData)
    return window.alert("エクセルの形式に誤りがあります。");

  const getAlphabet = (columnName: any) =>
    mapOfColumnNameAndAlphabet.get(columnName);
  const getCellValue = (columnName: string, rowNumber: number) => {
    const cell = sheet[getAlphabet(columnName) + String(rowNumber)];
    return cell ? String(cell["w"]).trim() : null;
  };

  const getNumberOfSheetRows = (rowNumberFromRefData: number) => {
    for (let i = 2; i < rowNumberFromRefData + 2 - 1; i++) {
      const pLat = getCellValue("pLat", i);
      const pLng = getCellValue("pLng", i);
      const dLat = getCellValue("dLat", i);
      const dLng = getCellValue("dLng", i);

      const latOrLngExist = (pLat && pLng) || (dLat && dLng);
      if (!latOrLngExist) return i - 1;
    }
    return rowNumberFromRefData;
  };
  const numberOfSheetRows = getNumberOfSheetRows(rowNumberFromRefData);

  const mapOfLatLngUnion = new Map();
  const spotList = [] as any;
  const jobList = [];

  //pickupまたはdeliveryのspotIdをオブジェクトで返す関数  (ex { spotId: '2' } )
  //また、spotListに新しいspotを追加する
  const getSpotIdAndPushSpot = (
    columnNameOfLat: string,
    columnNameOfLng: string,
    columnNameOfTravelDuration: string,
    columnNameOfSpotName: string,
    columnNameOfAddress: string,
    rowNumber: number
  ) => {
    const lat = Number(getCellValue(columnNameOfLat, rowNumber));
    const lng = Number(getCellValue(columnNameOfLng, rowNumber));
    if (!(lat && lng)) return false;

    const travelDuration = Number(
      getCellValue(columnNameOfTravelDuration, rowNumber)
    );
    const spotName = getCellValue(columnNameOfSpotName, rowNumber);
    const address = getCellValue(columnNameOfAddress, rowNumber);

    const unionOfLatLngAsString = String(lat) + String(lng);

    let spotId = null;

    if (mapOfLatLngUnion.has(unionOfLatLngAsString)) {
      //既出のspotである場合
      spotId = mapOfLatLngUnion.get(unionOfLatLngAsString);
    } else {
      //新spotである場合
      //idが一意になるよう、Mapのサイズをidにする (新しいspotが出るたびMapのサイズは1大きくなる)

      const spotIdComposedOfMapsize = String(mapOfLatLngUnion.size);

      //新しいspotの場合はspotListに入れる
      const spot = {
        id: spotIdComposedOfMapsize,
        geocode: { lat, lng },
        guidanceLocations: [
          {
            geocode: { lat, lng },
            uTurnCost: 10000,
          },
        ],
      };
      if (spotName) (spot as any)["name"] = spotName;
      if (address) (spot as any)["address"] = { address1: address };
      if (travelDuration)
        (spot as any)["guidanceLocations"][0]["travelDuration"] =
          travelDuration * 60;

      spotList.push(spot);

      spotId = spotIdComposedOfMapsize;

      //Mapに登録 (サイズがここで1大きくなる)
      mapOfLatLngUnion.set(unionOfLatLngAsString, spotIdComposedOfMapsize);
    }

    return spotId;
  };

  //2行目から必要な情報 1行目は必要ないためrowの数から1を引く
  for (let rowNumber = 2; rowNumber < numberOfSheetRows + 2 - 1; rowNumber++) {
    const jobName = getCellValue("jobName", rowNumber);
    const size = Number(getCellValue("size", rowNumber));
    const pServiceDuration = Number(
      getCellValue("pServiceDuration", rowNumber)
    );
    const dServiceDuration = Number(
      getCellValue("dServiceDuration", rowNumber)
    );
    const pTw1s = getCellValue("pTw1s", rowNumber);
    const pTw1e = getCellValue("pTw1e", rowNumber);
    const dTw1s = getCellValue("dTw1s", rowNumber);
    const dTw1e = getCellValue("dTw1e", rowNumber);
    const pTw2s = getCellValue("pTw2s", rowNumber);
    const pTw2e = getCellValue("pTw2e", rowNumber);
    const dTw2s = getCellValue("dTw2s", rowNumber);
    const dTw2e = getCellValue("dTw2e", rowNumber);
    const pTw3s = getCellValue("pTw3s", rowNumber);
    const pTw3e = getCellValue("pTw3e", rowNumber);
    const dTw3s = getCellValue("dTw3s", rowNumber);
    const dTw3e = getCellValue("dTw3e", rowNumber);
    const skill1 = getCellValue("skill1", rowNumber);
    const skill2 = getCellValue("skill2", rowNumber);
    const skill3 = getCellValue("skill3", rowNumber);
    const skill4 = getCellValue("skill4", rowNumber);
    const skills = [];
    const priority = Number(getCellValue("priority", rowNumber));
    const rideTimeCost = Number(getCellValue("rideTimeCost", rowNumber));
    const memo = getCellValue("memo", rowNumber);

    const pushTimeWindow = (
      timeWindowStart: any,
      timeWindowEnd: any,
      ranges: any[]
    ) => {
      if (timeWindowStart && timeWindowEnd) {
        ranges.push({
          readyTime: getISODateFromDateAndTime(projectDate, timeWindowStart),
          dueTime: getISODateFromDateAndTime(projectDate, timeWindowEnd),
        });
      }
    };

    const pSpotId = getSpotIdAndPushSpot(
      "pLat",
      "pLng",
      "pTravelDuration",
      "pName",
      "pAddress",
      rowNumber
    );
    const dSpotId = getSpotIdAndPushSpot(
      "dLat",
      "dLng",
      "dTravelDuration",
      "dName",
      "dAddress",
      rowNumber
    );

    const job = {
      id: String(rowNumber - 2),
    };

    if (pSpotId) {
      (job as any)["pickup"] = { spotId: pSpotId };

      const pRanges: any[] = [];

      if (pServiceDuration)
        (job as any)["pickup"]["serviceDuration"] = pServiceDuration * 60;

      pushTimeWindow(pTw1s, pTw1e, pRanges);
      pushTimeWindow(pTw2s, pTw2e, pRanges);
      pushTimeWindow(pTw3s, pTw3e, pRanges);

      if (pRanges.length >= 1)
        (job as any)["pickup"]["timeWindow"] = { ranges: pRanges };
    }
    if (dSpotId) {
      (job as any)["delivery"] = { spotId: dSpotId };

      const dRanges: any[] = [];

      if (dServiceDuration)
        (job as any)["delivery"]["serviceDuration"] = dServiceDuration * 60;

      pushTimeWindow(dTw1s, dTw1e, dRanges);
      pushTimeWindow(dTw2s, dTw2e, dRanges);
      pushTimeWindow(dTw3s, dTw3e, dRanges);

      if (dRanges.length >= 1)
        (job as any)["delivery"]["timeWindow"] = { ranges: dRanges };
    }

    if (jobName) (job as any)["name"] = jobName;
    if (size) (job as any)["demands"] = [{ dimId: "size", size: size }];

    if (skill1) skills.push(skill1);
    if (skill2) skills.push(skill2);
    if (skill3) skills.push(skill3);
    if (skill4) skills.push(skill4);
    if (skills.length >= 1) (job as any)["skills"] = skills;
    if (priority) (job as any)["priority"] = priority;
    if (rideTimeCost) (job as any)["rideTimeCost"] = rideTimeCost;
    if (memo) (job as any)["memo"] = memo;

    jobList.push(job);
  }

  return new Map([
    ["spots", spotList],
    ["jobs", jobList],
  ]);
};
