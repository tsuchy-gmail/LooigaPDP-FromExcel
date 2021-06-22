import * as React from "react";
import styled from "styled-components";

import MuiFab from "@material-ui/core/Fab";

import Icon from "./Icon";
import Text from "./Text";

const TextWrapper = styled.div`
  margin-left: 10px;
`;

const PositionAbsolute = styled.div`
  position: fixed;
  right: 20px;
  bottom: 50px;
`;

type RequestFloatButtonProps = {
  onClick: any;
};

const RequestFloatButton: React.VFC<RequestFloatButtonProps> = ({
  onClick,
}) => {
  return (
    <PositionAbsolute>
      <MuiFab
        onClick={onClick}
        variant="extended"
        color="primary"
        style={{ padding: "0 20px" }}
      >
        <Icon type="Send" />
        <TextWrapper>
          <Text>Loogiaへ送信</Text>
        </TextWrapper>
      </MuiFab>
    </PositionAbsolute>
  );
};

export default React.memo(RequestFloatButton);
