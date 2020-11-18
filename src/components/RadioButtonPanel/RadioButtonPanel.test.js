import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MapAndDataContainer from "../MapAndDataContainer/MapAndDataContainer.js";
import { headings, dataObject, organizedObject } from "../../utils/data.js";

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

describe("<RadioButtonPanel />", () => {
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
    organizedObject["Alabama"] = {
      deaths: {
        "2/4/2020": 0,
      },
    };
  });
  test("it should mount", () => {
    render(<MapAndDataContainer testEnv="true" />);
    const radioButton = screen.getByTestId("RadioButton");
    expect(radioButton).toBeInTheDocument();
  });
});
