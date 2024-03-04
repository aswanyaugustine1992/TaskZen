import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from './LoginPage'; 
import { AuthContext } from '../contexts/AuthContext'; 
import { BrowserRouter } from 'react-router-dom';


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate,
}));

describe('SignIn Component', () => {
  let mockSignIn;

  beforeEach(() => {
    mockSignIn = jest.fn();
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ signIn: mockSignIn }}>
          <SignIn />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });

  test('renders correctly', () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('updates username and password fields on user input', () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'password');

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password');
  });

  test('submits the form and calls signIn with the username and password', async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'password');
    userEvent.click(signInButton);

    expect(mockSignIn).toHaveBeenCalledWith('testuser', 'password');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
