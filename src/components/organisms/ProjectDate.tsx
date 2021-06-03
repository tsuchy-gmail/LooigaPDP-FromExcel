import React from "react";
import styled from "styled-components";

import DatePicker from "../atoms/DatePicker";
import IconText from "../molecules/IconText";
import Paper from "../atoms/Paper";

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

const ProjectDate = () => {
  return (
    <Paper>
      <Wrapper>
        <IconText type="Schedule" text="Date" />
        <DatePickerWrapper>
          <DatePicker size="20px" label="プロジェクトの日付" />
        </DatePickerWrapper>
      </Wrapper>
    </Paper>
  );
};

export default ProjectDate;
