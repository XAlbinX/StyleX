import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartIcon from './cart-icon.component';
import { CartContext } from '../../contexts/cart.context';

const mockContextValue = {
    cartItems: [],
    isCartOpen: false, // Example value for isCartOpen
    setIsCartOpen: jest.fn(), // Example value for setIsCartOpen
    addItemToCart: jest.fn(), // Example value for addItemToCart
    removeItemFromCart: jest.fn(), // Example value for removeItemFromCart
    clearItemFromCart: jest.fn(), // Include missing property
    cartCount: 0, // Include missing property
    cartTotal: 0, // Include missing property
  };

test('renders CartIcon component with a count of 0', () => {

  render(
    <CartContext.Provider value={mockContextValue}>
      <CartIcon />
    </CartContext.Provider>
  );

  const cartIcon = screen.getByTestId('cart-icon');
  const itemCount = screen.getByTestId('item-count');

  expect(cartIcon).toBeInTheDocument();
  expect(itemCount).toBeInTheDocument();
  expect(itemCount).toHaveTextContent('0');
});

test('clicking CartIcon sets isCartOpen to true', () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartIcon />
      </CartContext.Provider>
    );
  
    const cartIcon = screen.getByTestId('cart-icon');
  
    fireEvent.click(cartIcon);
  
    expect(mockContextValue.setIsCartOpen).toHaveBeenCalledTimes(1);
    expect(mockContextValue.setIsCartOpen).toHaveBeenCalledWith(true);
  });

test('clicking CartIcon toggles isCartOpen', () => {
    render(
    <CartContext.Provider value={mockContextValue}>
        <CartIcon />
    </CartContext.Provider>
    );

    const cartIcon = screen.getByTestId('cart-icon');

    fireEvent.click(cartIcon);

    expect(mockContextValue.setIsCartOpen).toHaveBeenCalledTimes(1);
    expect(mockContextValue.setIsCartOpen).toHaveBeenCalledWith(!mockContextValue.isCartOpen);
});
