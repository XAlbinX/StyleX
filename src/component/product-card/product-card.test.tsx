import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './product-card.component';

const mockProduct = {
  id: 1,
  imageUrl: 'product1.jpg',
  name: 'Product 1',
  price: 10,
};

// Create a mock CartContext for testing
const mockCartContext = {
  addItemToCart: jest.fn(),
};

describe('ProductCard', () => {
  beforeEach(() => {
    render(<ProductCard product={mockProduct} />);
  });

  it('renders the product information correctly', () => {
    const nameElement = screen.getByText(mockProduct.name);

    expect(nameElement).toBeInTheDocument();
  });
});
