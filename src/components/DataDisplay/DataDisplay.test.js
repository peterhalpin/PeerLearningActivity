import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataDisplay from './DataDisplay';
import { dataObject, renderData } from '../../utils/data.js';

let newPromise = new Promise(function(resolve) {
	resolve(renderData());
})
describe('<DataDisplay />', () => {
  beforeAll(async (done) => {
	renderData();
	done();
  });
  test('it should mount', () => {
    		render(<DataDisplay />);
    		
    		const dataDisplay = screen.getByTestId('DataDisplay');

    		expect(dataDisplay).toBeInTheDocument();
		
  });
});
