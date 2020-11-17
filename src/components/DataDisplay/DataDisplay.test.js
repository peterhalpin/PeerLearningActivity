import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataDisplay from './DataDisplay';
import { mapIntToDate, dataObject } from '../../utils/data.js';

let state = 'Alabama';
let displayName = 'deaths';
let dateInt = 75;
let data= 0;

describe('<DataDisplay />', () => {
  beforeAll(() => {
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
  });

  test('it should mount', () => {
	render(<DataDisplay selectedDataType={displayName} selectedState={state} selectedDate={dateInt} currentData={data}/>);
	const dataDisplay = screen.getByTestId('DataDisplay');
	expect(dataDisplay).toBeInTheDocument();
  });

  test('it should display correct value based on input', () => {
	let dateKey= mapIntToDate(dateInt);
	render(<DataDisplay selectedDataType={displayName} selectedState={state} selectedDate={dateInt} currentData={data}/>);
	const dataDisplay = screen.getByTestId('DataDisplay');
	expect(dataDisplay).toHaveTextContent(state);
    expect(dataDisplay).toHaveTextContent(displayName);
    expect(dataDisplay).toHaveTextContent(dateKey);
    expect(dataDisplay).toHaveTextContent(data.toString());
  });
});
