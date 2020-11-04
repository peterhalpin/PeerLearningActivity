import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Map from './Map';

//jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
//   Map: () => ({})
//}));
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

describe('<Map />', () => {
  test('it should mount', () => {
    render(<Map />);
    
    const map = screen.getByTestId('Map');

    expect(map).toBeInTheDocument();
  });
});
