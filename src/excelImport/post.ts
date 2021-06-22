const axiosBase = require("axios");

export const request = async (
  organization: any,
  requestBody: any,
  enableMultiDepot: any
) => {
  const axios = axiosBase.create({
    headers: {
      "Content-Type": "application/json",
      "X-Loogia-App-Id": organization.AppID,
      "X-Loogia-API-Key": organization.ApiKey,
    },
  });

  const URL = enableMultiDepot
    ? "https://dev.loogia.tech/api/v0/multiDepotProjects"
    : "https://dev.loogia.tech/api/v0/projects";

  console.log("URL = ", URL);

  try {
    const response = await axios.post(URL, requestBody);
    window.alert("Success!");
    console.log("response = ", response);
  } catch (error) {
    console.log("- error - ", error);
    window.alert("- Error -");
  }
};
