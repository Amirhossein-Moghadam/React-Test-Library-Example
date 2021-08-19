import { useState } from "react";
import "./App.css";

export function replaceCamelWithSpace(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [colourButton, setColourButton] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newButtonClick = colourButton === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

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
        style={{
          backgroundColor: disabled ? "gray" : colourButton,
          color: "white",
        }}
        disabled={disabled}
      >
        Change To {replaceCamelWithSpace(newButtonClick)}
      </button>
      <input
        type="checkbox"
        id="disbale-button-checkbox"
        onChange={handleOnChage}
        defaultChecked={disabled}
        aria-checked={disabled}
      />
      <label htmlFor="disbale-button-checkbox">Disabled Button</label>
    </div>
  );
}

export default App;
