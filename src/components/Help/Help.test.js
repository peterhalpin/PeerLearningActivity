import React from "react";
import { render, screen } from "../QaPanel/node_modules/@testing-library/react";
import "../QaPanel/node_modules/@testing-library/jest-dom/extend-expect";
import HelpButton from "./HelpButton";

describe("<help />", () => {
  test("it should mount", () => {
    render(<HelpButton />);
    const helpButton = screen.getByTestId("helpButton");
    expect(helpButton).toBeInTheDocument();
  });
});
