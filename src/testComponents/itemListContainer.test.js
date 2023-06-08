import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemListContainer from '../../components/body/itemListContainer';
import useFetchCharacters from '../api/apiListCharacters';

jest.mock('../api/apiListCharacters', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ItemListContainer', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
    { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' },
  ];

  it('renderizar el componente ItemListContainer', () => {
    jest.spyOn(useFetchCharacters, 'default').mockReturnValue({ characters: mockCharacters, totalPages: 2 });

    const { getByText } = render(<ItemListContainer />);
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Pagination')).toBeInTheDocument();
  });

  it('actualizar la página actual y restablecer los filtros en el botón de la página siguiente', () => {
    jest.spyOn(useFetchCharacters, 'default').mockReturnValue({ characters: mockCharacters, totalPages: 2 });

    const { getByTestId } = render(<ItemListContainer />);
    const nextPageButton = getByTestId('next-page-button');

    fireEvent.click(nextPageButton);

    expect(useFetchCharacters.default).toHaveBeenCalledWith(2, '', '');
  });

  it('actualizar la página actual y restablecer los filtros en la página anterior haga clic en el botón', () => {
    jest.spyOn(useFetchCharacters, 'default').mockReturnValue({ characters: mockCharacters, totalPages: 2 });

    const { getByTestId } = render(<ItemListContainer />);
    const previousPageButton = getByTestId('previous-page-button');

    fireEvent.click(previousPageButton);

    expect(useFetchCharacters.default).toHaveBeenCalledWith(1, '', '');
  });

  it('actualizar el filtro de ubicación y restablecer la página actual en el cambio de filtro de ubicación', () => {
    jest.spyOn(useFetchCharacters, 'default').mockReturnValue({ characters: mockCharacters, totalPages: 2 });

    const { getByTestId } = render(<ItemListContainer />);
    const locationFilterInput = getByTestId('location-filter-input');

    fireEvent.change(locationFilterInput, { target: { previousSibling: { value: 'Earth' } } });

    expect(useFetchCharacters.default).toHaveBeenCalledWith(1, 'Earth', '');
  });

  it('actualizar el filtro de nombre y restablecer la página actual en el cambio de filtro de nombre', () => {
    jest.spyOn(useFetchCharacters, 'default').mockReturnValue({ characters: mockCharacters, totalPages: 2 });

    const { getByTestId } = render(<ItemListContainer />);
    const nameFilterInput = getByTestId('name-filter-input');

    fireEvent.change(nameFilterInput, { target: { previousSibling: { value: 'Rick' } } });

    expect(useFetchCharacters.default).toHaveBeenCalledWith(1, '', 'Rick');
  });
});
