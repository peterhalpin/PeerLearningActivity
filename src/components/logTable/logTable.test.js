import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LogTable from './logTable';




describe('<logTable />', () => {
  test('it should mount', () => {
    render(<LogTable testEnv="true"/>);
    const logTable = screen.getByTestId('logTable');
    screen.debug();
    expect(logTable).toBeInTheDocument();
  });

});