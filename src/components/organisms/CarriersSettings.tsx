import React from "react";
import styled from "styled-components";

import CarrierSettingsRow from "../molecules/CarrierSettingsRow";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../atoms/Icon";
import Paper from "../atoms/Paper";
import MuiPaper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import IconText from "../molecules/IconText";

const ContentsWrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const IconButtonWrapper = styled.div`
  text-align: center;
`;
const CarrierSettingsRowsWrapper = styled.div`
  margin-top: 50px;
  > * {
    margin-bottom: 30px;
  }
`;

const CarriersSettings = () => {
  const [rows, setRows] = React.useState([CarrierSettingsRow]);

  const addRow = () => {
    setRows((row) => [...row, CarrierSettingsRow]);
  };

  const deleteRow = (index: number) => {
    setRows((row) => {
      row.splice(index, 1);
      return [...row];
    });
  };

  return (
    <Paper width="93%" margin="0 auto" maxWidth="1600px">
      <IconText type="LocalShipping" text="Carriers" />
      <ContentsWrapper>
        <CarrierSettingsRowsWrapper>
          {rows.map((Row, index) => (
            <Row deleteRow={() => deleteRow(index)} key={index} />
          ))}
        </CarrierSettingsRowsWrapper>
        <IconButtonWrapper>
          <Fab onClick={addRow} color="primary">
            <Icon size="40px" type="Add" />
          </Fab>
        </IconButtonWrapper>
      </ContentsWrapper>
    </Paper>
  );
};

export default CarriersSettings;
