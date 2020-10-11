import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QAPanel from './QAPanel';

describe('<QAPanel />', () => {
  test('it should mount', () => {
    render(<QAPanel />);
    
    const qaPanel = screen.getByTestId('QAPanel');

    expect(qaPanel).toBeInTheDocument();
  });
});