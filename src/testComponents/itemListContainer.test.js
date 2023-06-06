import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemListContainer from './ItemListContainer';

describe('ItemListContainer', () => {
  it('renders without errors', () => {
    render(<ItemListContainer />);
  });

  it('fetches characters and updates state', async () => {
    // Mockear fetch y respuesta
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: ['character1', 'character2'],
        info: { pages: 2 },
      }),
    });

    render(<ItemListContainer />);

    // Esperar a que se actualice el estado
    await screen.findByText('character1');

    // Verificar que los personajes se hayan asignado correctamente al estado
    expect(screen.getByText('character1')).toBeInTheDocument();
    expect(screen.getByText('character2')).toBeInTheDocument();
  });

  it('handles next page click', async () => {
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: ['character3', 'character4'],
        info: { pages: 3 },
      }),
    });

    render(<ItemListContainer />);

    await screen.findByText('character3');

    // Hacer clic en el botón de siguiente página
    fireEvent.click(screen.getByText('Siguiente'));

    // Verificar que currentPage se haya actualizado correctamente
    expect(screen.getByText('currentPage: 2')).toBeInTheDocument();
  });

  it('handles previous page click', async () => {
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: ['character1', 'character2'],
        info: { pages: 3 },
      }),
    });

    render(<ItemListContainer />);
    await screen.findByText('character1');

    // Navegar a la segunda página
    fireEvent.click(screen.getByText('Siguiente'));
    await screen.findByText('character1');

    // Hacer clic en el botón de página anterior
    fireEvent.click(screen.getByText('Anterior'));

    // Verificar que currentPage se haya actualizado correctamente
    expect(screen.getByText('currentPage: 1')).toBeInTheDocument();
  });

  it('handles location filter change', async () => {
    jest.spyOn(window, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({
        results: ['character1', 'character2'],
        info: { pages: 1 },
      }),
    });

    render(<ItemListContainer />);
    await screen.findByText('character1');

    // Ingresar un valor en el campo de filtro de ubicación
    fireEvent.change(screen.getByPlaceholderText('Location'), {
      target: { value: 'Earth' },
    });

    // Hacer clic en el botón de búsqueda de ubicación
    fireEvent.click(screen.getByText('Search'));

    // Verificar que locationFilter se haya actualizado correctamente
    expect(screen.getByText('locationFilter: Earth')).toBeInTheDocument();
    // Verificar que currentPage se haya restablecido a 1
    expect(screen.getByText('currentPage: 1')).toBeInTheDocument();
  });

  it('handles name filter change', async () => {
    jest.spyOn(window, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({
        results: ['character1', 'character2'],
        info: { pages: 1 },
      }),
    });

    render(<ItemListContainer />);
    await screen.findByText('character1');

    // Ingresar un valor en el campo de filtro de nombre
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Rick' },
    });

    // Hacer clic en el botón de búsqueda de nombre
    fireEvent.click(screen.getByText('Search'));

    // Verificar que nameFilter se haya actualizado correctamente
    expect(screen.getByText('nameFilter: Rick')).toBeInTheDocument();
    // Verificar que currentPage se haya restablecido a 1
    expect(screen.getByText('currentPage: 1')).toBeInTheDocument();
  });
});
