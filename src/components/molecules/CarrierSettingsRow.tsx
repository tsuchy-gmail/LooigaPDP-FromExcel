import React, { VFC } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import TextField from "../atoms/TextField";
import TimePicker from "../atoms/TimePicker";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import Checkbox from "../atoms/Checkbox";
import CheckboxWithText from "../molecules/CheckboxWithText";
import { disable, secondary, primary } from "../../utils/colors";

import MuiIconButton from "@material-ui/core/IconButton";
import MuiPaper from "@material-ui/core/Paper";
import MuiFab from "@material-ui/core/Fab";

import Paper from "../atoms/Paper";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MainSettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  > * {
    :not(:last-child) {
      margin-right: 30px;
    }
  }
`;

const BreakSettingsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  > * {
    :not(:last-child) {
      margin-right: 30px;
    }
  }
`;

const CheckCircleWrapper = styled.div`
  margin-right: 80px;
`;

const CheckboxWrapper = styled.div`
  position: relative;
  top: 7px;
`;

const carrierCountOptions = [...new Array(50).keys()].map((count) => count + 1); //[1,2,3,.....50]

type CarrierSettingsRowProps = {
  deleteRow: () => void;
};

const CarrierSettingsRow: VFC<CarrierSettingsRowProps> = ({ deleteRow }) => {
  const width = 120;
  const [isOpen, setIsOpen] = React.useState(false);
  const handleChange = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const [checked, setChecked] = React.useState(true);

  return (
    <Paper opacity={checked ? 1 : 0.5} minWidth="800px" elevation={3}>
      <Wrapper>
        <CheckCircleWrapper>
          <Checkbox
            value={checked}
            onChange={() => setChecked(!checked)}
            checkedIcon={<Icon type="RadioButtonUnchecked" />}
            icon={<Icon type="CheckCircle" color={primary} />}
            scale={1.4}
          />
        </CheckCircleWrapper>
        <div>
          <MainSettingsWrapper>
            <Select
              items={carrierCountOptions}
              weight={700}
              width={width}
              label="車両台数"
            />
            <TextField width={width} label="積載容量" />
            <TimePicker width={width} label="出発時刻" />
            <TimePicker width={width} label="帰着時刻" />
            <CheckboxWrapper>
              <CheckboxWithText
                value={isOpen}
                weight={500}
                onChange={handleChange}
              >
                {isOpen ? <b>休憩あり</b> : "休憩なし"}
              </CheckboxWithText>
            </CheckboxWrapper>
          </MainSettingsWrapper>

          {isOpen && (
            <BreakSettingsWrapper>
              <TimePicker width={width} label="休憩開始(可能)" />
              <TimePicker width={width} label="休憩終了(可能)" />
              <TextField width={width} label="休憩時間" end="min" />
            </BreakSettingsWrapper>
          )}
        </div>
        <MuiIconButton style={{ marginLeft: "80px" }} onClick={deleteRow}>
          <Icon type="DeleteSweep" color={secondary} />
        </MuiIconButton>
      </Wrapper>
    </Paper>
  );
};

export default CarrierSettingsRow;