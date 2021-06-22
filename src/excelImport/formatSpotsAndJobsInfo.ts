//jsのMapオブジェクトを使い、spotが新しいものか既出のものかを判定する
//
//緯度経度の文字列を連結したものを比較して判定する ( 35.99999136.99999 という具合 )
//
//[["35.99999136.99999", '0']...]というMapがある時
//
//Mapのhasメソッドを使いhas('35.99999136.99999')としてこれがtrueであればそのjobのspotIdは'0'となる

export const getFormattedSpotsAndJobs = (
  sheet: any,
  mapOfColumnNameAndAlphabet: any
) => {
  console.log("arg sheet = ", sheet);
  console.log("!ref = ", sheet["!ref"]);
  const numberOfSheetRows = sheet["!ref"].replace(/..../, "") - 1;

  const getAlphabet = (columnName: any) =>
    mapOfColumnNameAndAlphabet.get(columnName);

  const mapOfLatLngUnion = new Map();
  const spotList = [] as any;
  const jobList = [];

  //pickupまたはdeliveryのspotIdをオブジェクトで返す関数  (ex { spotId: '2' } )
  //また、spotListに新しいspotを追加する
  const getJobInfoAndAddSpot = (
    columnNameOfLat: string,
    columnNameOfLng: string,
    i: number
  ) => {
    const lat = sheet[getAlphabet(columnNameOfLat) + String(i)]["v"];
    const lng = sheet[getAlphabet(columnNameOfLng) + String(i)]["v"];

    const unionOfLatLngAsString = String(lat) + String(lng);

    const tripInfo = { spotId: "" };

    if (mapOfLatLngUnion.has(unionOfLatLngAsString)) {
      //既出のspotである場合
      tripInfo.spotId = mapOfLatLngUnion.get("unionOfLatAndLngAsString");
    } else {
      //新spotである場合
      //idが一意になるよう、Mapのサイズをidにする (新しいspotが出るたびMapのサイズは1大きくなる)

      const spotIdComposedOfMapsize = String(mapOfLatLngUnion.size);

      //新しいspotの場合はspotListに入れる
      const spot = {
        id: spotIdComposedOfMapsize,
        geocode: {
          lat: lat,
          lng: lng,
        },
      };
      spotList.push(spot);

      tripInfo.spotId = spotIdComposedOfMapsize;

      //Mapに登録 (サイズがここで1大きくなる)
      mapOfLatLngUnion.set(unionOfLatLngAsString, spotIdComposedOfMapsize);
    }

    return tripInfo;
  };
  //2行目から必要な情報 1行目は必要ないためrowの数から1を引く
  for (let i = 2; i < numberOfSheetRows + 2 - 1; i++) {
    const pTrip = getJobInfoAndAddSpot("pLat", "pLng", i);
    const dTrip = getJobInfoAndAddSpot("dLat", "dLng", i);

    jobList.push({ pickup: pTrip, delivery: dTrip });
  }

  return new Map([
    ["spots", spotList],
    ["jobs", jobList],
  ]);
};
