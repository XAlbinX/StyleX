import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DirectoryItem from './directory-item.component';

const mockCategory = {
  imageUrl: 'test-image.jpg',
  title: 'Test Category',
  route: '/test-category',
};

test('renders DirectoryItem component', () => {
  render(
    <MemoryRouter>
      <DirectoryItem category={mockCategory} />
    </MemoryRouter>
  );
  const directoryItem = screen.getByTestId('directory-item');
  expect(directoryItem).toBeInTheDocument();
});
