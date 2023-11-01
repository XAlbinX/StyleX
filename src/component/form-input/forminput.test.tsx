import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from './form-input.component';


test('renders a label if label prop is provided', () => {
  render(<FormInput label="Email" />);
  const labelElement = screen.getByText('Email');
  expect(labelElement).toBeInTheDocument();
});


test('invokes onChange callback when input value changes', () => {
  const handleChange = jest.fn();
  render(<FormInput label="Username" onChange={handleChange} />);
  const inputElement = screen.getByRole('textbox');
  userEvent.type(inputElement, 'user123');
  expect(handleChange).toHaveBeenCalledTimes(7); // 7 times, one for each character typed
});
