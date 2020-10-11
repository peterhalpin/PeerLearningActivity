import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import dataPanels from './dataPanels';

describe('<dataPanels />', () => {
  test('it should mount', () => {
    render(<dataPanels />);
    
    const dataPanels = screen.getByTestId('dataPanels');

    expect(dataPanels).toBeInTheDocument();
  });
});