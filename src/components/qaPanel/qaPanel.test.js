import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import qaPanel from './qaPanel';

describe('<qaPanel />', () => {
  test('it should mount', () => {
    render(<qaPanel />);
    
    const qaPanel = screen.getByTestId('qaPanel');

    expect(qaPanel).toBeInTheDocument();
  });
});