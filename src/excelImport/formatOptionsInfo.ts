export const getFormattedOptions = (optionSettingsMap: Map<any, any>) => {
  const formattedOptions = {} as any;
  const getSettings = (option: any) => optionSettingsMap.get(option);
  const optionSettingsMapKeys = [...optionSettingsMap.keys()];

  optionSettingsMapKeys
    .filter((option: any) => getSettings(option).checked)
    .forEach((option: any) => {
      if(option === 'calculationTime') getSettings(option).value = Number(getSettings(option).value)
      formattedOptions[option] =
        getSettings(option).value ?? getSettings(option).checked;
    });

  return formattedOptions;
};
