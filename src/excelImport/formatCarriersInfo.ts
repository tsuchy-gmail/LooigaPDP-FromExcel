import { formatDate } from "../utils/date";

export const getFormattedCarrierSettingsList = (
  carrierSettingsList: any,
  projectDate: Date,
  enableMultiDepot: boolean
) => {
  console.log("list = ", carrierSettingsList);
  const carriers = [] as any;
  carrierSettingsList
    .filter((carrierSettings: any) => carrierSettings.get("isRowChecked"))
    .forEach((carrierSettings: any, index: number) => {
      const getSetting = (settingItem: any) => carrierSettings.get(settingItem);

      const startDepotId = getSetting("startDepotId");
      const endDepotId = getSetting("endDepotId");
      const breakSetting = {
        range: {
          readyTime: getSetting("breakReadyTime"),
          dueTime: getSetting("breakDueTime"),
        },
        duration: getSetting("breakDuration"),
      };

      console.log("startTime = ", getSetting("startTime"));
      console.log(
        "formatedDate = ",
        formatDate(projectDate, getSetting("startTime"))
      );
      const formattedSettings = {
        //   startTime: getSetting("startTime"),
        //   endTime: getSetting("endTime"),
        startTime: formatDate(projectDate, getSetting("startTime")),
        endTime: formatDate(projectDate, getSetting("endTime")),
      } as any;

      if (enableMultiDepot) {
        formattedSettings["startDepotId"] = startDepotId;
        formattedSettings["endDepotId"] = endDepotId;
      }
      if (getSetting("enableBreak")) formattedSettings["break"] = breakSetting;

      for (let i = 0; i < getSetting("carrierCount"); i++) {
        carriers.push({ ...formattedSettings, id: `${index}-${String(i)}` });
      }
    });
  return carriers;
};
