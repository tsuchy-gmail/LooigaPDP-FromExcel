import * as React from "react";
import styled from "styled-components";

import CheckboxWithText from "../molecules/CheckboxWithText";
import Radio from "../atoms/Radio";
import Select from "../atoms/Select";
import Paper from "../atoms/Paper";
import OptionSettingsRow from "../molecules/OptionSettingsRow";
import {
  ChangeInput,
  HandleChange,
  ChangeSelect,
  UseState,
} from "../../utils/types";
import IconText from "../molecules/IconText";

const Wrapper = styled.div``;

const OptionRowsWrapper = styled.div`
  width: 700px;
  margin: 40px auto 0;
  > * {
    margin-bottom: 50px;
  }
`;

type Balancing = {
  checked: boolean;
  type: string;
  intensity: number;
};
type TurnDirectionRestriction = {
  checked: boolean;
  direction: string;
  intensity: number;
};
type WithValue = {
  checked: boolean;
  value: string | number;
};

type OnlyChecked = {
  checked: boolean;
};

type OptionSettings =
  | OnlyChecked
  | WithValue
  | Balancing
  | TurnDirectionRestriction;

export const initialOptionsSettings = new Map([
  [
    "balancing",
    {
      checked: false,
      value: {
        type: "duration",
        intensity: 5,
      },
    },
  ],
  [
    "turnDirectionRestriction",
    {
      checked: false,
      value: {
        direction: "RIGHT",
        intensity: 5,
      },
    },
  ],
  [
    "allowHighway",
    {
      checked: false,
      value: "Always",
    },
  ],
  [
    "keepStraight",
    {
      checked: false,
      value: 5,
    },
  ],
  [
    "calculationTime",
    {
      checked: false,
      value: "",
    },
  ],
  [
    "restrictUturn",
    {
      checked: false,
    },
  ],
  [
    "ignoreReturnTrip",
    {
      checked: false,
    },
  ],
  [
    "forceTargetLeft",
    {
      checked: false,
    },
  ],
  [
    "isFlexibleCarrierStartTime",
    {
      checked: false,
    },
  ],
]);

type OptionsSettings = typeof initialOptionsSettings;
type Option =
  | "balancing"
  | "turnDirectionRestriction"
  | "allowHighway"
  | "keepStraight"
  | "calculationTime"
  | "restrictUturn"
  | "ignoreReturnTrip"
  | "forceTargetLeft"
  | "isFlexibleCarrierStartTime";

const balancingTypeMap = new Map([
  ["duration", "????????????"],
  ["service", "????????????"],
]);

const turnDirectionTypeMap = new Map([
  ["RIGHT", "??????"],
  ["LEFT", "??????"],
]);

const allowHighwayTypeMap = new Map([
  ["Always", "????????????"],
  ["OnFirstLeg", "???????????????????????????????????????"],
  [
    "OnFirstAndLastLegs",
    "?????????????????????????????????????????????????????????????????????????????????",
  ],
]);

const oneToTen = [...new Array(10).keys()].map((number) => number + 1);
const listOfKeepStraightDegree = [...oneToTen].filter((number) => number !== 3);
//
//

type OptionsProps = {
  optionSettingsMapState: UseState<Map<string, any>>; //any??????
};

const Options: React.VFC<OptionsProps> = ({ optionSettingsMapState }) => {
  const [optionsSettings, setOptionsSettings] = optionSettingsMapState;
  const getHandleChange = (option: Option, nestedSetting?: string) => (
    event: ChangeInput | ChangeSelect
  ) => {
    if (nestedSetting) {
      optionsSettings.get(option).value[nestedSetting] = event.target.value;
      setOptionsSettings(new Map(optionsSettings));
    } else {
      optionsSettings.get(option).value = event.target.value;
      setOptionsSettings(new Map(optionsSettings));
    }
  };
  const getHandleChangeCheckbox = (option: Option) => () => {
    optionsSettings.get(option).checked = !optionsSettings.get(option).checked;

    setOptionsSettings(new Map(optionsSettings));
  };

  //alias
  const balancing = optionsSettings.get("balancing");
  const turnDirectionRestriction = optionsSettings.get(
    "turnDirectionRestriction"
  );
  const allowHighway = optionsSettings.get("allowHighway");
  const keepStraight = optionsSettings.get("keepStraight");
  const calculationTime = optionsSettings.get("calculationTime");

  const getCheckedAndOnChange = (option: Option) => ({
    checked: optionsSettings.get(option).checked,
    onChangeCheckbox: getHandleChangeCheckbox(option),
  });
  //

  // for validation calculatioinTime
  //
  // ????????????check?????????
  // ????????????????????????900?????????
  const checkCalculationTimeValue = () => {
    const inputTime = calculationTime.value;
    if (inputTime !== "") {
      if (Number(inputTime)) {
        //??????????????????????????????

        if (Number(inputTime) > 900 || Number(inputTime) < 1) {
          window.alert("1~900???????????????????????????????????????????????????");

          calculationTime.value = "900";
          setOptionsSettings(new Map(optionsSettings));
        }
      } else {
        //?????????+,-?????????????????????????????????

        calculationTime.checked = false;
        calculationTime.value = "";
        setOptionsSettings(new Map(optionsSettings));
      }
    } else {
      //??????????????????
      calculationTime.checked = false;
      setOptionsSettings(new Map(optionsSettings));
    }
  };

  const CheckCalculationTimeValue = styled.div.attrs({
    onBlur: checkCalculationTimeValue,
  })``;
  //

  return (
    <Paper width="93%" margin="0 auto">
      <Wrapper>
        <IconText type="Tune" text="Options" />
        <OptionRowsWrapper>
          <OptionSettingsRow
            {...getCheckedAndOnChange("balancing")}
            option="?????????"
            radioDisplayTextList={[...balancingTypeMap.values()]}
            radioValueList={[...balancingTypeMap.keys()]}
            radioCheckedValue={balancing.value.type}
            onChangeRadio={getHandleChange("balancing", "type")}
            selectItems={oneToTen}
            selectText="????????????"
            selectedValue={balancing.value.intensity}
            onChnageSelect={getHandleChange("balancing", "intensity")}
          />
          <OptionSettingsRow
            {...getCheckedAndOnChange("turnDirectionRestriction")}
            option="??????????????????"
            radioDisplayTextList={[...turnDirectionTypeMap.values()]}
            radioValueList={[...turnDirectionTypeMap.keys()]}
            radioCheckedValue={turnDirectionRestriction.value.direction}
            onChangeRadio={getHandleChange(
              "turnDirectionRestriction",
              "direction"
            )}
            selectItems={oneToTen}
            selectText="?????????"
            selectedValue={turnDirectionRestriction.value.intensity}
            onChnageSelect={getHandleChange(
              "turnDirectionRestriction",
              "intensity"
            )}
          />
          <OptionSettingsRow
            {...getCheckedAndOnChange("allowHighway")}
            option="?????????????????????"
            selectItems={[...allowHighwayTypeMap.values()]}
            selectValueList={[...allowHighwayTypeMap.keys()]}
            selectedValue={allowHighway.value}
            onChnageSelect={getHandleChange("allowHighway")}
          />
          <OptionSettingsRow
            {...getCheckedAndOnChange("keepStraight")}
            option="????????????????????????"
            selectItems={listOfKeepStraightDegree}
            selectedValue={keepStraight.value}
            selectLabel="default 3"
            selectWidth="70px"
            onChnageSelect={getHandleChange("keepStraight")}
          />
          <CheckCalculationTimeValue>
            <OptionSettingsRow
              option="?????????????????????"
              {...getCheckedAndOnChange("calculationTime")}
              textValue={calculationTime.value as string}
              textEnd="sec"
              textLabel="1~900 (sec)"
              onChangeTextField={getHandleChange("calculationTime")}
            />
          </CheckCalculationTimeValue>
          <OptionSettingsRow
            option="U??????????????????"
            {...getCheckedAndOnChange("restrictUturn")}
          />
          <OptionSettingsRow
            option="???????????????????????????"
            {...getCheckedAndOnChange("ignoreReturnTrip")}
          />
          <OptionSettingsRow
            option="??????????????????"
            {...getCheckedAndOnChange("forceTargetLeft")}
          />
          <OptionSettingsRow
            option="?????????????????????"
            checked={!optionsSettings.get("isFlexibleCarrierStartTime").checked}
            onChangeCheckbox={getHandleChangeCheckbox(
              "isFlexibleCarrierStartTime"
            )}
          />
        </OptionRowsWrapper>
      </Wrapper>
    </Paper>
  );
};

export default React.memo(Options);
