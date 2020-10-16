import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import logTable from './logTable';

describe('<logTable />', () => {
  test('it should mount', () => {
    render(<logTable />);
    
    const logTable = screen.getByTestId('logTable');

    expect(logTable).toBeInTheDocument();
  });
});