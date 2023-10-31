import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './button.component'; 
test('renders a button with text', () => {
  const { getByText } = render(<Button buttonType="inverted">Click Me</Button>);
  const buttonElement = getByText('Click Me');
  expect(buttonElement).toBeInTheDocument();
});

test('applies the correct CSS class based on buttonType', () => {
  const { container } = render(<Button buttonType="inverted">Inverted Button</Button>);
  const buttonElement = container.querySelector('button');
  expect(buttonElement).toHaveClass('inverted');
});

test('calls onClick handler when button is clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<Button buttonType="google" onClick={onClickMock}>Google Button</Button>);
  const buttonElement = getByText('Google Button');

  fireEvent.click(buttonElement);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('applies the correct CSS class when buttonType is "google"', () => {
  const { container } = render(<Button buttonType="google">Google Button</Button>);
  const buttonElement = container.querySelector('button');
  expect(buttonElement).toHaveClass('google-sign-in');
});
