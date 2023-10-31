import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutItem from './checkout-item.component';
import { CartContext } from '../../contexts/cart.context';

const mockCartItem = {
  id: 1,
  imageUrl: 'product1.jpg',
  name: 'Product 1',
  price: 10,
  quantity: 2,
};

const mockContextValue = {
  clearItemFromCart: jest.fn(),
  addItemToCart: jest.fn(),
  removeItemFromCart: jest.fn(),
  cartItems: [],
  isCartOpen: false, // Example value for isCartOpen
  setIsCartOpen: jest.fn(), // Example value for setIsCartOpen
  cartCount: 0, // Include missing property
  cartTotal: 0, // Include missing property
};

test('renders CheckoutItem component with cart item details', () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CheckoutItem cartItem={mockCartItem} />
      </CartContext.Provider>
    );
  
    // Check if cart item details are rendered
    const nameElement = screen.getByText(mockCartItem.name);
    const quantityElement = screen.getByText(`${mockCartItem.quantity}`);
    const priceElement = screen.getByText(`${mockCartItem.price}`);
  
    expect(nameElement).toBeInTheDocument();
    expect(quantityElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

test('calls clearItemFromCart when "Remove" button is clicked', () => {
  render(
    <CartContext.Provider value={mockContextValue}>
      <CheckoutItem cartItem={mockCartItem} />
    </CartContext.Provider>
  );

  // Find and click the "Remove" button
  const removeButton = screen.getByText('✕');
  fireEvent.click(removeButton);

  // Check if clearItemFromCart was called with the cart item
  expect(mockContextValue.clearItemFromCart).toHaveBeenCalledWith(mockCartItem);
});

test('calls addItemToCart when the "Increase Quantity" arrow is clicked', () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CheckoutItem cartItem={mockCartItem} />
      </CartContext.Provider>
    );
  
    // Find and click the "Increase Quantity" arrow
    const increaseArrow = screen.getByText('❯'); // Unicode escape sequence for "›"
    fireEvent.click(increaseArrow);
  
    // Check if addItemToCart was called with the cart item
    expect(mockContextValue.addItemToCart).toHaveBeenCalledWith(mockCartItem);
  });

test('calls removeItemFromCart when the "Decrease Quantity" arrow is clicked', () => {
  render(
    <CartContext.Provider value={mockContextValue}>
      <CheckoutItem cartItem={mockCartItem} />
    </CartContext.Provider>
  );

  // Find and click the "Decrease Quantity" arrow
  const decreaseArrow = screen.getByText('❮');
  fireEvent.click(decreaseArrow);

  // Check if removeItemFromCart was called with the cart item
  expect(mockContextValue.removeItemFromCart).toHaveBeenCalledWith(mockCartItem);
});
