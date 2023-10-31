import React from 'react';
import { render, screen } from '@testing-library/react';
import CartItem from './cart-item.component';

test('renders CartItem component with item details', () => {
  const cartItem = {
    id: 1,
    name: 'Sample Product',
    imageUrl: 'sample.jpg',
    price: 10,
    quantity: 2,
  };

  render(<CartItem cartItem={cartItem} />);

  // Check if CartItem and its content is rendered
  const cartItemContainer = screen.getByTestId('cart-item');
  expect(cartItemContainer).toBeInTheDocument();

  // Check if item details are displayed correctly
  const nameElement = screen.getByText('Sample Product');
  const priceElement = screen.getByText('2 x $10');

  expect(nameElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});
