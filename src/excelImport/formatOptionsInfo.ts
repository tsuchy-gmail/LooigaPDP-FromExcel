export const getFormattedOptions = (optionSettingsMap: Map<any, any>) => {
  const formattedOptions = {} as any;
  const getSettings = (option: any) => optionSettingsMap.get(option);
  const optionSettingsMapKeys = [...optionSettingsMap.keys()];

  optionSettingsMapKeys
    .filter((option: any) => getSettings(option).checked)
    .forEach((option: any) => {
      formattedOptions[option] =
        getSettings(option).value ?? getSettings(option).checked;
    });

  return formattedOptions;
};
