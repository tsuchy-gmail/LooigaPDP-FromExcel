import { getISODateFromDateAndTime } from "../utils/date";

export const getFormattedCarrierSettingsList = (
  carrierSettingsList: any,
  projectDate: Date,
  enableMultiDepot: boolean
) => {
  const carriers = [] as any;
  carrierSettingsList
    .filter((carrierSettings: any) => carrierSettings.get("isRowChecked"))
    .forEach((carrierSettings: any, index: number) => {
      const getSetting = (settingItem: any) => carrierSettings.get(settingItem);
      const getISODate = (item: any) =>
        getISODateFromDateAndTime(projectDate, getSetting(item));

      const startDepotId = getSetting("startDepotId");
      const endDepotId = getSetting("endDepotId");
      const breakSetting = {
        ranges: [
          {
            readyTime: getISODate("breakReadyTime"),
            dueTime: getISODate("breakDueTime"),
          },
        ],
        duration: getSetting("breakDuration") * 60,
      };

      const formattedSettings = {
        startTime: getISODate("startTime"),
        endTime: getISODate("endTime"),
        capacities: [{ dimId: "size", size: Number(getSetting("capacity")) }],
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
