import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Slider from "./Slider";
import { headings, dataObject } from "../../utils/data.js";

describe("<Slider />", () => {
  beforeAll(() => {
    headings.push("deaths");
    headings.push("tests");
    dataObject.push({
      date: "2020-02-04",
      deaths: "0",
      id: "1089",
      infections: "0",
      location: "Alabama",
      tests: "0",
      total_deaths: "0",
      total_infections: "0",
      total_tests: "0",
    });
  });

  test("it should mount", () => {
    let handleChange = jest.fn();
    render(
      <Slider
        dateRange={100}
        selectedDate={50}
        changeSelectedDate={handleChange}
      />
    );
    const slider = screen.getByTestId("Slider");
    expect(slider).toBeInTheDocument();
  });
});
