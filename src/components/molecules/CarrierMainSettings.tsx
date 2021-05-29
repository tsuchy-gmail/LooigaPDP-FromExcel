import React, { VFC } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import TextField from "../atoms/TextField";
import TimePicker from "../atoms/TimePicker";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

const Wrapper = styled.div`
  > :first-child {
    margin-bottom: 20px;
  }
`;
const IncludeCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RequiredSettingsWrapper = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
  align-items: center;
`;

const BreakSettingsWrapper = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
`;

const CheckboxWithText = styled.div`
  display: flex;
  margin-left: 16px;
`;

const carrierCountOptions = [...new Array(50).keys()].map((count) => count + 1); //[1,2,3,.....50]

const CarrierMainSettingsRow: VFC = () => {
  const width = 100;
  const [isOpen, setIsOpen] = React.useState(false);
  const handleChange = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <Wrapper>
      <IncludeCheckboxWrapper>
        <RequiredSettingsWrapper>
          <Select
            items={carrierCountOptions}
            width={width}
            label="車両台数"
            weight={700}
          />
          <TextField width={width} label="積載容量" weight={700} />
          <TimePicker width={width} label="出発時刻" weight={700} />
          <TimePicker width={width} label="帰着時刻" weight={700} />
        </RequiredSettingsWrapper>
        <CheckboxWithText>
          <input type="checkbox" checked={isOpen} onChange={handleChange} />
          <Text>{isOpen ? "休憩あり" : "休憩なし"}</Text>
        </CheckboxWithText>
      </IncludeCheckboxWrapper>

      {isOpen && (
        <BreakSettingsWrapper>
          <TimePicker width={width * 1.5} label="休憩開始(可能)" />
          <TimePicker width={width * 1.5} label="休憩終了(可能)" />
          <TextField width={width} label="休憩時間" end="min" />
        </BreakSettingsWrapper>
      )}
    </Wrapper>
  );
};

export default CarrierMainSettingsRow;
