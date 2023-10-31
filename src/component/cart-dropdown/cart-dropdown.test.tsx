import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartDropdown from './cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

// Create a mock context provider to provide cartItems
const mockCartItems = [
  {
    id: 1,
    name: 'Product 1',
    imageUrl: 'product1.jpg',
    price: 10,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Product 2',
    imageUrl: 'product2.jpg',
    price: 15,
    quantity: 1,
  },
];

const mockContextValue = {
    cartItems: mockCartItems,
    isCartOpen: false, // Example value for isCartOpen
    setIsCartOpen: jest.fn(), // Example value for setIsCartOpen
    addItemToCart: jest.fn(), // Example value for addItemToCart
    removeItemFromCart: jest.fn(), // Example value for removeItemFromCart
    clearItemFromCart: jest.fn(), // Include missing property
    cartCount: 0, // Include missing property
    cartTotal: 0, // Include missing property
  };

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

test('renders CartDropdown component', () => {
  render(
    <CartContext.Provider value={mockContextValue}>
      <CartDropdown />
    </CartContext.Provider>
  );

  // Check if CartDropdown and its content is rendered
  const cartDropdown = screen.getByTestId('cart-dropdown');
  expect(cartDropdown).toBeInTheDocument();

  // Check if cart items are displayed
  const cartItemElements = screen.getAllByTestId('cart-item');
  expect(cartItemElements.length).toBe(2); // Assuming we have two cart items

  // Check if "GO TO CHECKOUT" button is rendered
  const checkoutButton = screen.getByText('GO TO CHECKOUT');
  expect(checkoutButton).toBeInTheDocument();
});

test('clicking "GO TO CHECKOUT" button navigates to checkout', () => {
  render(
    <CartContext.Provider value={mockContextValue}>
      <CartDropdown />
    </CartContext.Provider>
  );

  const checkoutButton = screen.getByText('GO TO CHECKOUT');
  fireEvent.click(checkoutButton);

  expect(mockNavigate).toBeCalledWith('/checkout');
});