import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MapAndDataContainer from '../MapAndDataContainer/MapAndDataContainer.js';
import { headings, dataObject, renderData, organizedObject } from '../../utils/data.js';


jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));


describe('<DataPanels />', () => {
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
	organizedObject['Alabama'] = {
		'deaths': {
			'2/4/2020': 0
		}
	};
  	
  })
  test('it should mount', () => {
	render(<MapAndDataContainer testEnv='true'/>);
	const radioButton = screen.getByTestId('RadioButton');
	expect(radioButton).toBeInTheDocument();
  });
//  test('radio button should trigger the right data', () => {
//	render(<MapAndDataContainer testEnv='true'/>);
//	const testText = 'deaths';
//	testRadioToDataDisplay(testText, testText);
//  });
});


const testRadioToDataDisplay = (buttonName, displayName) => {
    const radio = screen.getByDisplayValue(buttonName);
	const state = 'Alabama';
	const dateKey = '2/4/2020';
	fireEvent.change(radio, { target: { value: buttonName } });
	
	const data = getData(state, dateKey, buttonName); 

    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(state);
    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(displayName);
    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(dateKey);
    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(data.toString());

	
}

const getData = (state, date, type) => {
    if(organizedObject) {
      let dataForState = organizedObject[state];
      if(dataForState) {
        let destylizedType = type.replace(' ', '_');
        let dataForType = dataForState[destylizedType];
        if(dataForType) {
		  console.log(date)
          let dataForDate = dataForType[date];
		  return dataForDate;
        }
      }
    }
	return undefined;
}
