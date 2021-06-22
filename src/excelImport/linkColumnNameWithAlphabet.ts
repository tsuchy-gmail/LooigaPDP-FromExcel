//excelのA行の一番上が 'job_name' である時['jobName', A] と言ったMapを作る
//そうすることで, 'job_name'　がどのcolumnに書かれていても対応できる

export const getMapOfColumnNamAndAlphabet = (sheet: any) => {
  const mapOfColumnNameAndAlphabet = new Map();

  //A~Z 計26文字
  for (let i = 0; i < 26; i++) {
    const oneOfAlphabet = String.fromCodePoint(65 + i); //A~Z
    const columnTop = sheet[oneOfAlphabet + "1"];

    const setToMap = (camelCaseOfColumnName: string) => {
      mapOfColumnNameAndAlphabet.set(camelCaseOfColumnName, oneOfAlphabet);
    };

    if (columnTop) {
      switch (columnTop.v) {
        case "job_name":
          setToMap("jobName");
          break;
        case "p_name":
          setToMap("pName");
          break;
        case "p_lat":
          setToMap("pLat");
          break;
        case "p_lng":
          setToMap("pLng");
          break;
        case "p_tw1s":
          setToMap("pTw1s");
          break;
        case "p_tw1e":
          setToMap("pTw1e");
          break;
        case "p_service_duration":
          setToMap("pServiceDuration");
          break;
        case "p_travel_duration":
          setToMap("pTravelDuration");
          break;
        case "d_name":
          setToMap("dName");
          break;
        case "d_lat":
          setToMap("dLat");
          break;
        case "d_lng":
          setToMap("dLng");
          break;
        case "d_tw1s":
          setToMap("dTw1s");
          break;
        case "d_tw1e":
          setToMap("dTw1e");
          break;
        case "d_service_duration":
          setToMap("dServiceDuration");
          break;
        case "d_travel_duration":
          setToMap("dTravelDuration");
          break;
        case "size":
          setToMap("size");
      }
    }
  }

  return mapOfColumnNameAndAlphabet;
};
