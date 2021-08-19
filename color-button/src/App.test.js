import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App.jsx";
import { replaceCamelWithSpace } from "./App";

test("button has correct initial color", () => {
  render(<App />);

  // expect the button text to be 'change to Midnight Blue'
  const buttonColor = screen.getByRole("button", { name: /change to Midnight Blue/i });

  // expect the background color to be Medium Violent Red
  expect(buttonColor).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(buttonColor);

  // expect the background color to be Midnight Blue
  expect(buttonColor).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'change to Medim Violet Red'
  expect(buttonColor.textContent).toBe("Change To Medium Violet Red");
});

test("initial condition", () => {
  render(<App />);

  // check that the button starts out enanled
  const buttonColor = screen.getByRole("button", { name: /change to Midnight Blue/i });
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

test("Disable button has gray background and reverts to Medium Violet Red", () => {
  render(<App />);
  const checkBox = screen.getByRole("checkbox", { name: /disabled button/i });
  const colorButton = screen.getByRole("button", { name: "Change To Midnight Blue" });

  // disable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // re-enable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Clicked disabled button has gray background and reverts to Midnight Blue", () => {
  render(<App />);
  const checkBox = screen.getByRole("checkbox", { name: /disabled button/i });
  const colorButton = screen.getByRole("button", { name: "Change To Midnight Blue" });

  // change button to Midnight Blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // re-enable button
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "Midnight Blue" });
});

describe("Spaces before camel-case capital letter", () => {
  test("works for no inner capital letter", () => {
    expect(replaceCamelWithSpace("Red")).toBe("Red");
  });

  test("works for one inner capital letter", () => {
    expect(replaceCamelWithSpace("MidnightBlue")).toBe("Midnight Blue");
  });

  test("works for multiple inner capital letter", () => {
    expect(replaceCamelWithSpace("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
