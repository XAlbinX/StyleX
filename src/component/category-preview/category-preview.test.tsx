import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use Router for Link component
import CategoryPreview from './category-preview.component';

describe('CategoryPreview', () => {
  const title = 'Test Category';
  const products = [
    {
      id: 1,
      imageUrl: 'product1.jpg',
      name: 'Product 1',
      price: 10,
    },
    {
      id: 2,
      imageUrl: 'product2.jpg',
      name: 'Product 2',
      price: 15,
    },
  ];

  it('should render correctly', () => {
    render(
      <Router>
        <CategoryPreview title={title} products={products} />
      </Router>
    );

    const titleElement = screen.getByText(title.toUpperCase());
    const productElements = screen.getAllByTestId('product-card');
    
    expect(titleElement).toBeInTheDocument();
    expect(productElements).toHaveLength(2); // Assuming there are two products in the array
  });

  it('should display the title correctly', () => {
    render(
      <Router>
        <CategoryPreview title={title} products={products} />
      </Router>
    );

    const titleElement = screen.getByText(title.toUpperCase());
    expect(titleElement).toBeInTheDocument();
  });

  it('should display products', () => {
    render(
      <Router>
        <CategoryPreview title={title} products={products} />
      </Router>
    );

    const productElements = screen.getAllByTestId('product-card');
    expect(productElements).toHaveLength(2); // Assuming there are two products in the array
  });

  it('should set the correct "to" attribute for the title Link', () => {
    render(
      <Router>
        <CategoryPreview title={title} products={products} />
      </Router>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/${title}`);
  });
});
