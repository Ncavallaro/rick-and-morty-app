import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharacterDetail from '../components/body/characterDetail';

jest.mock('node-fetch', () =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
          },
          location: {
            name: 'Citadel of Ricks',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        }),
    })
  )
);

describe('CharacterDetail', () => {
  it('renderiza el componente con los datos del personaje', async () => {
    const characterId = '1';

    const { getByText, getByAltText } = render(
      <BrowserRouter initialEntries={[`/character/${characterId}`]}>
        <Routes>
          <Route
            path="/character/:id"
            element={<CharacterDetail />}
          />
        </Routes>
      </BrowserRouter>
    );

    await waitForElementToBeRemoved(() => getByText('Loading...'));

    expect(getByAltText('Rick Sanchez')).toBeInTheDocument();
    expect(getByText("Rick Sanchez")).toBeInTheDocument();
    expect(getByText("Status: Alive")).toBeInTheDocument();
    expect(getByText("Species: Human")).toBeInTheDocument();
    expect(getByText("Gender: Male")).toBeInTheDocument();
    expect(getByText("Origin: Earth (C-137)")).toBeInTheDocument();
    expect(getByText("Location: Citadel of Ricks")).toBeInTheDocument();
  });
});
