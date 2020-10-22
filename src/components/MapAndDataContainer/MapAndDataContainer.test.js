import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MapAndDataContainer from './MapAndDataContainer';

describe('<MapAndDataContainer />', () => {
  test('it should mount', () => {
    render(<MapAndDataContainer />);
    
    const mapAndDataContainer = screen.getByTestId('MapAndDataContainer');

    expect(mapAndDataContainer).toBeInTheDocument();
  });
});