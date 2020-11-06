import React from 'react';
import { render, screen, wait, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataPanels from './DataPanels';
import MapAndDataContainer from '../MapAndDataContainer/MapAndDataContainer.js';
import { getDefaultDateInt, mapIntToDate, renderData, organizedObject } from '../../utils/data.js';

//jest.mock('../../utils/data.js');

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
//  beforeAll(async (done) => {
//  	await renderData();
//	done();
//  });
  test('it should mount', () => {
	//render(<DataPanels testEnv="true"/>);
	render(<MapAndDataContainer testEnv='true'/>);
	const dataPanels = screen.getByTestId('DataPanels');
	expect(dataPanels).toBeInTheDocument();
  });
  test('radio button hould trigger the right data', () => {
	render(<DataPanels testEnv="true"/>);
	const testText = 'Deaths';
	testRadioToDataDisplay(testText, testText);
  });
});


const testRadioToDataDisplay = (buttonName, displayName) => {
    const radio = screen.getByLabelText(buttonName);
	const state = 'Alabama';
	const dateInt = getDefaultDateInt();
	const dateKey = mapIntToDate(dateInt);
    fireEvent.click(radio);
	
	const data = getData(state, dateKey, buttonName) 

	if(data) {
    	expect(screen.getByTestId("DataDisplay")).toHaveTextContent(data.toString());
	}

    expect(screen.getByTestId("DataDisplay")).toHaveTextContent(displayName);
	
}

const getData = (state, date, type) => {
    if(organizedObject) {
      let dataForState = organizedObject[state];
      if(dataForState) {
        let destylizedType = testText.replace(' ', '_');
        let dataForType = dataForState[destylizedType];
        if(dataForType) {
          let dataForDate = dataForType[dataKey];
		  return dataForDate;
        }
      }
    }
	return undefined;
}
