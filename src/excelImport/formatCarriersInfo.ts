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
        getSetting(item)
          ? getISODateFromDateAndTime(projectDate, getSetting(item))
          : "";

      const startDepotId = getSetting("startDepotId");
      const endDepotId = getSetting("endDepotId");

      const formattedSettings = {
        startTime: getISODate("startTime"),
        endTime: getISODate("endTime"),
        capacities: [{ dimId: "size", size: Number(getSetting("capacity")) }],
      } as any;

      //-------------------------------breakSetting
      const createBreakSettings = (
        readyTime: any,
        dueTime: any,
        duration: any
      ) => {
        if (readyTime && dueTime && duration) {
          return { ranges: [{ readyTime, dueTime }], duration: duration * 60 };
        } else {
          return false;
        }
      };

      const breakReadyTime1 = getISODate("breakReadyTime1");
      const breakDueTime1 = getISODate("breakDueTime1");
      const breakDuration = Number(getSetting("breakDuration"));
      const breakCount = getSetting("breakCount");

      const breakReadyTime2 = getISODate("breakReadyTime2");
      const breakDueTime2 = getISODate("breakDueTime2");
      const breakReadyTime3 = getISODate("breakReadyTime3");
      const breakDueTime3 = getISODate("breakDueTime3");

      const breakSettings = createBreakSettings(
        breakReadyTime1,
        breakDueTime1,
        breakDuration
      );

      if (breakCount >= 1 && breakSettings) {
        if (breakCount >= 2 && breakReadyTime2 && breakDueTime2) {
          breakSettings.ranges.push({
            readyTime: breakReadyTime2,
            dueTime: breakDueTime2,
          });
        }
        if (breakCount === 3 && breakReadyTime3 && breakDueTime3) {
          breakSettings.ranges.push({
            readyTime: breakReadyTime3,
            dueTime: breakDueTime3,
          });
        }

        formattedSettings["break"] = breakSettings;
      }
      //-------------------------------breakSetting

      if (enableMultiDepot) {
        formattedSettings["startDepotId"] = startDepotId;
        formattedSettings["endDepotId"] = endDepotId;
      }

      const driverId = getSetting("driverId");
      const vehicleId = getSetting("vehicleId");
      const acceptableLateness = getSetting("acceptableLateness");
      const maxTotalWorkingDuration = getSetting("maxTotalWorkingDuration");
      const skill1 = getSetting("skill1");
      const skill2 = getSetting("skill2");
      const skill3 = getSetting("skill3");
      const skill4 = getSetting("skill4");
      const skills = [];

      if (driverId) formattedSettings["driverId"] = driverId;
      if (vehicleId) formattedSettings["vehicleId"] = vehicleId;
      if (acceptableLateness)
        formattedSettings["acceptableLateness"] = acceptableLateness * 60;
      if (maxTotalWorkingDuration)
        formattedSettings["maxTotalWorkingDuration"] =
          maxTotalWorkingDuration * 60;
      if (skill1) skills.push(skill1);
      if (skill2) skills.push(skill2);
      if (skill3) skills.push(skill3);
      if (skill4) skills.push(skill4);
      if (skills.length >= 1 && getSetting("canInputSkills"))
        formattedSettings["skills"] = skills;

      for (let i = 0; i < getSetting("carrierCount"); i++) {
        carriers.push({ ...formattedSettings, id: `${index}-${String(i)}` });
      }
    });
  return carriers;
};
