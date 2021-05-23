import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  type Name = "Taro" | "Yui" | "Kei";
  const [name, setName] = useState<Name>();
  console.log(name);
  const changeName = () => {
    setName("Yui");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello , TypeScript</p>
      </header>
    </div>
  );
}

export default App;
