import React from 'react';
import { render, screen, wait, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataPanels from './DataPanels';
import MapAndDataContainer from '../MapAndDataContainer/MapAndDataContainer.js';
import { mapIntToDate, headings, dataObject, renderData, organizedObject } from '../../utils/data.js';


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
	};
  	
  })
  test('it should mount', () => {
	render(<MapAndDataContainer testEnv='true'/>);
	const dataPanels = screen.getByTestId('DataPanels');
	expect(dataPanels).toBeInTheDocument();
  });
  test('radio button should trigger the right display', () => {
	render(<MapAndDataContainer testEnv='true'/>);
	const testText = 'deaths';
	testRadioToDataDisplay(testText, testText);
  });
  test('slider should trigger the right display', () => {
	render(<MapAndDataContainer testEnv='true'/>);
	const dateInt= 2;
	const displayDate= mapIntToDate(dateInt);
	testSliderToDataDisplay(dateInt, displayDate);
  });
});


const testRadioToDataDisplay = (buttonName, displayName) => {
    const radio = screen.getByDisplayValue(buttonName);
	const state = 'Alabama';
	const dateKey = '2/4/2020';
	fireEvent.change(radio, { target: { value: buttonName } });
	
	const data = getData(state, dateKey, buttonName); 

    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(state);
    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(displayName);
    //expect(screen.getByTestId("DataDisplay")).toHaveTextContent(dateKey);
    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(data.toString());

	
}
const testSliderToDataDisplay = (sliderDateInt, displayDate) => {
    //const radio = screen.getByDisplayValue(buttonName);
	const slider = screen.getByTestId('SliderInput');
	const state = 'Alabama';
	//const dateKey = '2/4/2020';
	fireEvent.change(slider, { target: { value: sliderDateInt} });
	
	const data = getData(state, displayDate, 'deaths'); 
	console.log("data: " + data);

    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(state);
    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(displayDate);
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
