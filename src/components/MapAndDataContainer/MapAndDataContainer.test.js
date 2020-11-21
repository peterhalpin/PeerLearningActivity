import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MapAndDataContainer from "./MapAndDataContainer";
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
describe("<MapAndDataContainer />", () => {
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
    dataObject.push({
      date: "2020-02-05",
      deaths: "1",
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
        "2/5/2020": 1,
      },
    };
  });
  test("it should mount", () => {
    render(<MapAndDataContainer testEnv="true" />);

    const mapAndDataContainer = screen.getByTestId("MapAndDataContainer");

    expect(mapAndDataContainer).toBeInTheDocument();
  });
  test("child components should mount", () => {
    render(<MapAndDataContainer testEnv="true" />);

    const map = screen.getByTestId("Map");
    const slider = screen.getByTestId("Slider");
    const dataDisplay = screen.getByTestId("DataDisplay");
    const radioButton = screen.getByTestId("RadioButton");

    expect(map).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
    expect(dataDisplay).toBeInTheDocument();
    expect(radioButton).toBeInTheDocument();
  });
});
