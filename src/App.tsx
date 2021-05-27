import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Select from "./components/atoms/Select";
import Text from "./components/atoms/Text";
import TextField from "./components/atoms/TextField";
import Button from "./components/atoms/Button";
import Icon from "./components/atoms/Icon";
import IconText from "./components/molecules/IconText";
import { secondary } from "./utils/colors";
import DatePicker from "./components/atoms/DatePicker";
import TimePicker from "./components/atoms/TimePicker";
import CarrierMainSettingsRow from "./components/molecules/CarrierMainSettings";
import SubtitleWithText from "./components/molecules/SubtitleWithText";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ background: "#F4F5F6" }}>
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <b>Hello, TypeScript!</b>
      </div>
      <Select
        items={[1, 2, 3, 4, 5]}
        helper="heloperだYO!"
        label="TEST"
        width={500}
        size="23px"
        weight={700}
      />
      <SubtitleWithText />
      <Text weight={700} color={"blue"}>
        Text!
      </Text>
      <CarrierMainSettingsRow />
      <CarrierMainSettingsRow />
      <CarrierMainSettingsRow />
      <TextField end="(min)" size="20px" weight={700} />
      <Button variant="contained" color="secondary" width={500} height={200}>
        <Text size="20px" weight={700}>
          Buttonの中のText
        </Text>
      </Button>
      <Button>
        <Icon size="50px" color="secondary" />
      </Button>
      <IconText
        type="NearMe"
        color={secondary}
        marginRight="30px"
        iconSize="50px"
        textSize="30px"
        weight={700}
      >
        IconText
      </IconText>
      <DatePicker weight={700} />
      <TimePicker size="30px" />
    </div>
  );
}

export default App;
