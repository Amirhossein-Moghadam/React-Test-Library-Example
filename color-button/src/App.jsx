import { useState } from "react";
import "./App.css";

function App() {
  const [colourButton, setColourButton] = useState("red");
  const [disabled, setDisabled] = useState(false);
  const newButtonClick = colourButton === "red" ? "blue" : "red";

  const handleOnClick = () => {
    setColourButton(newButtonClick);
  };

  const handleOnChage = (e) => {
    setDisabled(e.target.checked);
  };

  return (
    <div>
      <button
        onClick={handleOnClick}
        style={{ backgroundColor: colourButton, color: "white" }}
        disabled={disabled}
      >
        Change To {newButtonClick}
      </button>
      <input
        type="checkbox"
        onChange={handleOnChage}
        defaultChecked={disabled}
        aria-checked={disabled}
      />
    </div>
  );
}

export default App;
