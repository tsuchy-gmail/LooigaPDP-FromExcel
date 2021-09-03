const axiosBase = require("axios");

export const request = async (
  organization: any,
  requestBody: any,
  enableMultiDepot: any,
  setIsRequesting: any,
  setShowSuccessSnackbar: any
) => {
  const axios = axiosBase.create({
    headers: {
      "Content-Type": "application/json",
      "X-Loogia-App-Id": organization.AppID,
      "X-Loogia-API-Key": organization.ApiKey,
    },
  });

  const URL = enableMultiDepot
    ? "https://loogia.tech/api/v0/multiDepotProjects"
    : "https://loogia.tech/api/v0/projects";

  const devURL = enableMultiDepot
    ? "https://dev.loogia.tech/api/v0/multiDepotProjects"
    : "https://dev.loogia.tech/api/v0/projects";

  const isOrganizationDev = organization.name === "dev"; //最終的にはdevもこの設定も消す

  try {
    const response = await axios.post(
      isOrganizationDev ? devURL : URL,
      requestBody
    );
    setIsRequesting(false);
    setShowSuccessSnackbar(true);
  } catch (error) {
    setIsRequesting(false);
    const errorMessages = error.response.data.detail.map(
      (messageObject: any) => messageObject.message
    );

    window.alert(`- Error - \n ${errorMessages.join("\n")}`);
  }
};
