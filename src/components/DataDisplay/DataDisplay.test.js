import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataDisplay from './DataDisplay';

describe('<DataDisplay />', () => {
  test('it should mount', () => {
    render(<DataDisplay />);
    
    const dataDisplay = screen.getByTestId('DataDisplay');

    expect(dataDisplay).toBeInTheDocument();
  });
});