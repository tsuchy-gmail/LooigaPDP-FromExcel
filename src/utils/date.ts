const now = new Date();

export const current = {
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  date: now.getDate(),
  hours: now.getHours(),
  minutes: now.getMinutes(),
  seconds: now.getSeconds(),
  monthDate: `${now.getMonth() + 1}月${now.getDate()}日`,
};

export const getISODateFromDateAndTime = (date: Date, time: string) => {
  if (time.length === 4) time = "0" + time;
  return date.toISOString().replace(/T.*/, `T${time}:00+09:00`);
};
