import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { mapIntToDate, headings, dataObject, renderData, organizedObject } from './utils/data.js';


jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

  beforeAll(() => {
	headings.push('deaths');
	headings.push('tests');
	dataObject.push({
		date: "2020-02-04",
		deaths: "0",
		id: "1089",
		infections: "0",
		location: "Alabama",
		tests: "0",
		total_deaths: "0",
		total_infections: "0",
		total_tests: "0"
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
		total_tests: "0"
	});
	organizedObject['Alabama'] = {
		'deaths': {
			'2/4/2020': 0,
			'2/5/2020': 1
		}
	}
  });
test('renders App', () => {
  const app = render(<App />);
  //expect(app).toBeInTheDocument();
});
