import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Slider from './Slider';

describe('<Slider />', () => {
  test('it should mount', () => {
    render(<Slider />);
    
    const slider = screen.getByTestId('Slider');

    expect(slider).toBeInTheDocument();
  });
});