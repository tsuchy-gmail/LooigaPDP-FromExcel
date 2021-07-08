import * as React from "react";

import MuiRadio from "@material-ui/core/Radio";
import MuiRadioGroup from "@material-ui/core/RadioGroup";
import MuiFormControlLabel from "@material-ui/core/FormControlLabel";
import { ChangeInput, HandleChange } from "../../utils/types";
import Text from "../atoms/Text";

type RadioPorps = {
  displayTextList?: string[];
  valueList?: string[];
  checkedValue?: string;
  onChange?: HandleChange<ChangeInput>;
};

const Radio: React.VFC<RadioPorps> = ({
  displayTextList = ["ラジオ1", "ラジオ2"],
  valueList,
  checkedValue,
  onChange,
}) => {
  return (
    <div>
      {valueList &&
        valueList.map((value, index) => (
          <MuiFormControlLabel
            control={
              <div>
                <MuiRadio
                  color="primary"
                  value={value}
                  checked={checkedValue === value}
                  onChange={onChange}
                />
              </div>
            }
            label={<Text weight={400}>{displayTextList[index]}</Text>}
          />
        ))}
    </div>
  );
};

export default Radio;
