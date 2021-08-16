//jsのMapオブジェクトを使い、spotが新しいものか既出のものかを判定する
//
//緯度経度の文字列を連結したものを比較して判定する ( 35.99999136.99999 という具合 )
//
//[["35.99999136.99999", '0']...]というMapがある時
//
//Mapのhasメソッドを使いhas('35.99999136.99999')としてこれがtrueであればそのjobのspotIdは'0'となる

import { getISODateFromDateAndTime } from "../utils/date";

export const getFormattedSpotsAndJobs = (
  sheet: any,
  mapOfColumnNameAndAlphabet: any,
  projectDate: Date
) => {
  const numberOfSheetRows = Number(sheet["!ref"].replace(/..../, ""));

  const getAlphabet = (columnName: any) =>
    mapOfColumnNameAndAlphabet.get(columnName);
  const getCellValue = (
    columnName: string,
    rowNumber: number,
    character: string
  ) => {
    const cell = sheet[getAlphabet(columnName) + String(rowNumber)];
    if (cell) return cell[character];
    else return null;
  };

  const mapOfLatLngUnion = new Map();
  const spotList = [] as any;
  const jobList = [];

  //pickupまたはdeliveryのspotIdをオブジェクトで返す関数  (ex { spotId: '2' } )
  //また、spotListに新しいspotを追加する
  const getSpotIdAndPushSpot = (
    columnNameOfLat: string,
    columnNameOfLng: string,
    columnNameOfSpotName: string,
    columnNameOfAddress: string,
    rowNumber: number
  ) => {
    const spotName = getCellValue(columnNameOfSpotName, rowNumber, "v");
    const address = getCellValue(columnNameOfAddress, rowNumber, "v");
    const lat = getCellValue(columnNameOfLat, rowNumber, "v");
    const lng = getCellValue(columnNameOfLng, rowNumber, "v");

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

      spotList.push(spot);

      spotId = spotIdComposedOfMapsize;

      //Mapに登録 (サイズがここで1大きくなる)
      mapOfLatLngUnion.set(unionOfLatLngAsString, spotIdComposedOfMapsize);
    }

    return spotId;
  };

  //2行目から必要な情報 1行目は必要ないためrowの数から1を引く
  for (let rowNumber = 2; rowNumber < numberOfSheetRows + 2 - 1; rowNumber++) {
    const jobName = getCellValue("jobName", rowNumber, "v");
    const size = getCellValue("size", rowNumber, "v");
    const pServiceDuration = getCellValue("pServiceDuration", rowNumber, "v");
    const dServiceDuration = getCellValue("dServiceDuration", rowNumber, "v");
    const pTw1s = getCellValue("pTw1s", rowNumber, "w");
    const pTw1e = getCellValue("pTw1e", rowNumber, "w");
    const dTw1s = getCellValue("dTw1s", rowNumber, "w");
    const dTw1e = getCellValue("dTw1e", rowNumber, "w");
    const pTw2s = getCellValue("pTw2s", rowNumber, "w");
    const pTw2e = getCellValue("pTw2e", rowNumber, "w");
    const dTw2s = getCellValue("dTw2s", rowNumber, "w");
    const dTw2e = getCellValue("dTw2e", rowNumber, "w");
    const pTw3s = getCellValue("pTw3s", rowNumber, "w");
    const pTw3e = getCellValue("pTw3e", rowNumber, "w");
    const dTw3s = getCellValue("dTw3s", rowNumber, "w");
    const dTw3e = getCellValue("dTw3e", rowNumber, "w");

    const pSpotId = getSpotIdAndPushSpot(
      "pLat",
      "pLng",
      "pName",
      "pAddress",
      rowNumber
    );
    const dSpotId = getSpotIdAndPushSpot(
      "dLat",
      "dLng",
      "dName",
      "dAddress",
      rowNumber
    );

    const job = {
      id: String(rowNumber - 2),
      pickup: {
        spotId: pSpotId,
      },
      delivery: {
        spotId: dSpotId,
      },
    };

    const pRanges: any[] = [];
    const dRanges: any[] = [];

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

    if (jobName) (job as any)["name"] = jobName;
    if (size) (job as any)["demands"] = [{ dimId: "size", size: size }];
    if (pServiceDuration)
      (job as any)["pickup"]["serviceDuration"] = pServiceDuration * 60;
    if (dServiceDuration)
      (job as any)["delivery"]["serviceDuration"] = dServiceDuration * 60;

    pushTimeWindow(pTw1s, pTw1e, pRanges);
    pushTimeWindow(pTw2s, pTw2e, pRanges);
    pushTimeWindow(pTw3s, pTw3e, pRanges);
    pushTimeWindow(dTw1s, dTw1e, dRanges);
    pushTimeWindow(dTw2s, dTw2e, dRanges);
    pushTimeWindow(dTw3s, dTw3e, dRanges);

    if (pRanges.length >= 1)
      (job as any)["pickup"]["timeWindow"] = { ranges: pRanges };
    if (dRanges.length >= 1)
      (job as any)["delivery"]["timeWindow"] = { ranges: dRanges };

    jobList.push(job);
  }

  return new Map([
    ["spots", spotList],
    ["jobs", jobList],
  ]);
};
