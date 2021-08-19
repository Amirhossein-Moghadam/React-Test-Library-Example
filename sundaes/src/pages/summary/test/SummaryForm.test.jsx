import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("initial condition", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("checkbox disables button on first click and enables button on second click", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();
  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});

test("popover respond to hover", async () => {
  render(<SummaryForm />);
  // popover start in hidden display
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover apear upon mouseover of checkbox label
  const termAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disapear when mouse out
  userEvent.unhover(termAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
