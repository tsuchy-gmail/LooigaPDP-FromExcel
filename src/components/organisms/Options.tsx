import React from "react";
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
  | "forceTargetLeft";

const balancingTypeMap = new Map([
  ["duration", "勤務時間"],
  ["service", "訪問件数"],
]);

const turnDirectionTypeMap = new Map([
  ["RIGHT", "右折"],
  ["LEFT", "左折"],
]);

const allowHighwayTypeMap = new Map([
  ["Always", "常に許可"],
  ["OnFirstLeg", "出発後最初の訪問先まで許可"],
  [
    "OnFirstAndLastLegs",
    "出発後最初の訪問先までと、最後の訪問先からデポまで許可",
  ],
]);

const oneToTen = [...new Array(10).keys()].map((number) => number + 1);
const listOfKeepStraightDegree = [...oneToTen].filter((number) => number !== 3);
//
//

type OptionsProps = {
  optionSettingsMapState: UseState<Map<string, any>>; //any修正
};

const Options: React.VFC<OptionsProps> = ({ optionSettingsMapState }) => {
  const [optionsSettings, setOptionsSettings] = optionSettingsMapState;
  const getHandleChange = (option: Option, nestedSetting?: string) => (
    event: ChangeInput | ChangeSelect
  ) => {
    if (nestedSetting) {
      console.log(optionsSettings.get(option).value);
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
  // 空白ならcheckを解除
  // 範囲外なら上限の900に設定
  const checkCalculationTimeValue = () => {
    const inputTime = calculationTime.value;
    if (inputTime !== "") {
      if (Number(inputTime)) {
        //入力が正しい数値なら

        if (Number(inputTime) > 900 || Number(inputTime) < 1) {
          window.alert("1~900秒の範囲で指定する必要があります。");

          calculationTime.value = "900";
          setOptionsSettings(new Map(optionsSettings));
        }
      } else {
        //例えば+,-が混ざっているような時

        calculationTime.checked = false;
        calculationTime.value = "";
        setOptionsSettings(new Map(optionsSettings));
      }
    } else {
      //入力が空の時
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
            option="均等化"
            radioDisplayTextList={[...balancingTypeMap.values()]}
            radioValueList={[...balancingTypeMap.keys()]}
            radioCheckedValue={balancing.value.type}
            onChangeRadio={getHandleChange("balancing", "type")}
            selectItems={oneToTen}
            selectText="均等化度"
            selectedValue={balancing.value.intensity}
            onChnageSelect={getHandleChange("balancing", "intensity")}
          />
          <OptionSettingsRow
            {...getCheckedAndOnChange("turnDirectionRestriction")}
            option="右左折を抑制"
            radioDisplayTextList={[...turnDirectionTypeMap.values()]}
            radioValueList={[...turnDirectionTypeMap.keys()]}
            radioCheckedValue={turnDirectionRestriction.value.direction}
            onChangeRadio={getHandleChange(
              "turnDirectionRestriction",
              "direction"
            )}
            selectItems={oneToTen}
            selectText="抑制度"
            selectedValue={turnDirectionRestriction.value.intensity}
            onChnageSelect={getHandleChange(
              "turnDirectionRestriction",
              "intensity"
            )}
          />
          <OptionSettingsRow
            {...getCheckedAndOnChange("allowHighway")}
            option="高速道路を許可"
            selectItems={[...allowHighwayTypeMap.values()]}
            selectValueList={[...allowHighwayTypeMap.keys()]}
            selectedValue={allowHighway.value}
            onChnageSelect={getHandleChange("allowHighway")}
          />
          <OptionSettingsRow
            {...getCheckedAndOnChange("keepStraight")}
            option="直進維持度を変更"
            selectItems={listOfKeepStraightDegree}
            selectedValue={keepStraight.value}
            selectLabel="default 3"
            selectWidth="70px"
            onChnageSelect={getHandleChange("keepStraight")}
          />
          <CheckCalculationTimeValue>
            <OptionSettingsRow
              option="計算時間を指定"
              {...getCheckedAndOnChange("calculationTime")}
              textValue={calculationTime.value as string}
              textEnd="sec"
              textLabel="1~900 (sec)"
              onChangeTextField={getHandleChange("calculationTime")}
            />
          </CheckCalculationTimeValue>
          <OptionSettingsRow
            option="Uターンを禁止"
            {...getCheckedAndOnChange("restrictUturn")}
          />
          <OptionSettingsRow
            option="デポの近くから配送"
            {...getCheckedAndOnChange("ignoreReturnTrip")}
          />
          <OptionSettingsRow
            option="左づけを強制"
            {...getCheckedAndOnChange("forceTargetLeft")}
          />
        </OptionRowsWrapper>
      </Wrapper>
    </Paper>
  );
};

export default React.memo(Options);
