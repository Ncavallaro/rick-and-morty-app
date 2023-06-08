import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '../components/body/search';

describe('Search component', () => {
  it('debe llamar a handleNameFilterChange al hacer clic en el botón de búsqueda de nombre', () => {
    const handleNameFilterChange = jest.fn();
    const handleLocationFilterChange = jest.fn();
    const { getByLabelText, getByText } = render(
      <Search
        handleNameFilterChange={handleNameFilterChange}
        handleLocationFilterChange={handleLocationFilterChange}
      />
    );

    const nameInput = getByLabelText('Name');
    const nameSearchButton = getByText('Search Name');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.click(nameSearchButton);

    expect(handleNameFilterChange).toHaveBeenCalled();
  });

  it('debe llamar a handleLocationFilterChange al hacer clic en el botón de búsqueda de ubicación', () => {
    const handleNameFilterChange = jest.fn();
    const handleLocationFilterChange = jest.fn();
    const { getByLabelText, getByText } = render(
      <Search
        handleNameFilterChange={handleNameFilterChange}
        handleLocationFilterChange={handleLocationFilterChange}
      />
    );

    const locationInput = getByLabelText('Location');
    const locationSearchButton = getByText('Search Location');

    fireEvent.change(locationInput, { target: { value: 'New York' } });
    fireEvent.click(locationSearchButton);

    expect(handleLocationFilterChange).toHaveBeenCalled();
  });
});
