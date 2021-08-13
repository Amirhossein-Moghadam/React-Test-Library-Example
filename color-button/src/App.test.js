import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App from "./App.jsx";
import { replaceCamelWithSpace } from "./App";

test("button has  correct initial color", () => {
  render(<App />);

  // expect the button text to be 'change to blue'
  const buttonColor = screen.getByRole("button", { name: /change to blue/i });

  // expect the background color to be red
  expect(buttonColor).toHaveStyle({ backgroundColor: "red" });

  // click button
  fireEvent.click(buttonColor);

  // expect the background color to be blue
  expect(buttonColor).toHaveStyle({ backgroundColor: "blue" });

  // expect the button text to be 'change to red'
  expect(buttonColor.textContent).toBe("Change To red");
});

test("initial condition", () => {
  render(<App />);

  // check that the button starts out enanled
  const buttonColor = screen.getByRole("button", { name: /change to blue/i });
  expect(buttonColor).toBeEnabled();

  // check that the ckeckbox starts out unckecked
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

test("Checkbox disables button on first click and enable on second click", () => {
  render(<App />);

  const buttonColor = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox", { name: /disabled button/i });

  expect(buttonColor).toBeEnabled();

  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(buttonColor).toBeDisabled();

  fireEvent.click(checkBox);
  expect(checkBox).not.toBeChecked();
  expect(buttonColor).toBeEnabled();
});

test("Disable button has gray background and reverts to red", () => {
  render(<App />);
  const checkBox = screen.getByRole("checkbox", { name: /disabled button/i });
  const colorButton = screen.getByRole("button", { name: "Change To blue" });

  // disable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // re-enable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("Clicked disabled button has gray background and reverts to blue", () => {
  render(<App />);
  const checkBox = screen.getByRole("checkbox", { name: /disabled button/i });
  const colorButton = screen.getByRole("button", { name: "Change To blue" });

  // change button to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // re-enable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});

describe("Spaces before camel-case capital letter", () => {
  test("works for no inner capital letter", () => {
    expect(replaceCamelWithSpace("Red")).toBe("Red");
  });

  test("works for one inner capital letter", () => {
    expect(replaceCamelWithSpace("MidnightBlue")).toBe("Midnight Blue");
  });

  test("works for multiple inner capital letter", () => {
    expect(replaceCamelWithSpace("MediumViolentRed")).toBe(
      "Medium Violent Red"
    );
  });
});
