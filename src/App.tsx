import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Select from "./components/atoms/Select";
import Text from "./components/atoms/Text";
import TextField from "./components/atoms/TextField";
import Button from "./components/atoms/Button";
import Icon from "./components/atoms/Icon";

function App() {
  const [text, setText] = useState("initial");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <b>Hello, TypeScript!</b>
      </div>
      <input type="text" value={text} onChange={handleChange} />
      <Select
        items={[1, 2, 3, 4, 5]}
        helper="heloperだYO!"
        label="TEST"
        width={500}
        size="23px"
        weight={700}
      />
      <Text weight={700} color={"blue"}>
        Text!
      </Text>
      <TextField end="(min)" size="20px" weight={700} />
      <Button variant="contained" color="secondary" width={500} height={200}>
        <Text size="20px" weight={700}>
          Buttonの中のText
        </Text>
      </Button>
      <Button>
        <Icon size="50px" color="secondary" />
      </Button>
    </div>
  );
}

export default App;
