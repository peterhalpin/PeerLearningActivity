import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('<Header />', () => {
  test('it should mount', () => {
    render(<Header testEnv="true"/>);
    const header = screen.getByTestId('Header');
    expect(header).toBeInTheDocument();
  });

  test('it should display correct number of users', () => {
    render(<Header testEnv="true"/>);
    const header = screen.getByTestId('Header');
    fireEvent.click(screen.getByText(/refresh/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user1's turn");
  });

  test('end turn should work correctly', () => {
    render(<Header testEnv="true"/>);
    const header = screen.getByTestId('Header');
    fireEvent.click(screen.getByText(/refresh/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user1's turn");
    fireEvent.click(screen.getByText(/end turn/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user2's turn");
    fireEvent.click(screen.getByText(/end turn/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user3's turn");
    fireEvent.click(screen.getByText(/end turn/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user4's turn");
  });

  test('end turn should work correctly when it goes back to the first user', () => {
    render(<Header testEnv="true"/>);
    const header = screen.getByTestId('Header');
    fireEvent.click(screen.getByText(/refresh/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user1's turn");
    fireEvent.click(screen.getByText(/end turn/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user2's turn");
    fireEvent.click(screen.getByText(/end turn/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user3's turn");
    fireEvent.click(screen.getByText(/end turn/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user4's turn");
    fireEvent.click(screen.getByText(/end turn/i));
    expect(screen.getByText(/It's/i)).toHaveTextContent("It's user1's turn");
  });
});