import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QaPanel from './qaPanel';

describe('<qaPanel />', () => {
  test('it should mount', () => {
    render(<QaPanel />);
    
    const qaPanel = screen.getByTestId('QaPanel');

    expect(qaPanel).toBeInTheDocument();
  });
});