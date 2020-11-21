import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LandingPage from "./LandingPage";

describe("<landingPage />", () => {
  test("it should mount", () => {
    render(<LandingPage />);

    const landingPage = screen.getByTestId("LandingPage");

    expect(landingPage).toBeInTheDocument();
  });
});
