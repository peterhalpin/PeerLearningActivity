import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LogTable from "./LogTable";

describe("<logTable /> component test", () => {
  test("it should mount", () => {
    render(<LogTable testEnv="true" items={[]}/>);
    const logTable = screen.getByTestId("logTable");
    expect(logTable).toBeInTheDocument();
  });

  /*
  TODO: maybe move this to LogTableContainer.test.js
  test("text box should change before submit", () => {
    render(<LogTable testEnv="true" />);
    fireEvent.change(screen.getByPlaceholderText(/log/i), {
      target: { value: "a" },
    });
    screen.debug();
    expect(screen.getByPlaceholderText(/log/i)).toHaveValue("a");
  });

  test("log should change after submit", () => {
    render(<LogTable testEnv="true" />);
    fireEvent.change(screen.getByPlaceholderText(/log/i), {
      target: { value: "a" },
    });
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.getByPlaceholderText(/log/i)).toHaveValue("");
    expect(screen.getByRole(/listitem/i)).toHaveTextContent("a");
    screen.debug();
  });
  */
});
