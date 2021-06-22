export const getFormattedCarrierSettingsList = (carrierSettingsList: any) => {
  console.log("list = ", carrierSettingsList);
  const carriers = [] as any;
  carrierSettingsList
    .filter((carrierSettings: any) => carrierSettings.get("isRowChecked"))
    .forEach((carrierSettings: any) => {
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

      const formattedSettings = {
        //   startTime: getSetting("startTime"),
        //   endTime: getSetting("endTime"),
      } as any;

      if (getSetting("enableMultiDepot")) {
        formattedSettings["startDepotId"] = startDepotId;
        formattedSettings["endDepotId"] = endDepotId;
      }
      if (getSetting("enableBreak")) formattedSettings["break"] = breakSetting;

      for (let i = 0; i < getSetting("carrierCount"); i++) {
        carriers.push(formattedSettings);
      }
    });
  return carriers;
};
