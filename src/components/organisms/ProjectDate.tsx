import React from "react";
import styled from "styled-components";

import DatePicker from "../atoms/DatePicker";
import IconText from "../molecules/IconText";
import Paper from "../atoms/Paper";
import { UseState } from "../../utils/types";

const Wrapper = styled.div`
  & > {
    :first-child {
      margin-bottom: 25px;
    }
    :nth-child(2) {
      padding-left: 10px;
    }
  }
`;

const DatePickerWrapper = styled.div`
  width: 180px;
  margin: 0 auto;
`;

type ProjectDateProps = {
  projectDateState: UseState<Date | null>;
};

const ProjectDate: React.VFC<ProjectDateProps> = ({ projectDateState }) => {
  const [projectDate, setProjectDate] = projectDateState;

  const handleChangeDate = (date: Date | null) => {
    setProjectDate(date);
  };

  return (
    <Paper>
      <Wrapper>
        <IconText type="Schedule" text="Date" />
        <DatePickerWrapper>
          <DatePicker
            value={projectDate}
            onChange={handleChangeDate}
            size="19px"
            label="プロジェクトの日付"
          />
        </DatePickerWrapper>
      </Wrapper>
    </Paper>
  );
};

export default React.memo(ProjectDate);
