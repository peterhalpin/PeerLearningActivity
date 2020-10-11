import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TogetherButton from './TogetherButton';

describe('<TogetherButton />', () => {
  test('it should mount', () => {
    render(<TogetherButton />);
    
    const togetherButton = screen.getByTestId('TogetherButton');

    expect(togetherButton).toBeInTheDocument();
  });
});