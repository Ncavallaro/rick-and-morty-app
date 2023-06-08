import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ItemList from '../components/body/itemList';

const characters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    location: {
      name: 'Citadel of Ricks',
    },
    origin: {
      name: 'Earth (C-137)',
    },
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    location: {
      name: 'Earth',
    },
    origin: {
      name: 'Earth (C-137)',
    },
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];

describe('ItemList', () => {
  it('renderizar la lista de characters', () => {
    const { getByText, getAllByAltText } = render(
      <BrowserRouter>
        <ItemList characters={characters} />
      </BrowserRouter>
    );

    characters.forEach((character) => {
      const characterName = getByText(character.name);
      const characterLocation = getByText(`Location: ${character.location.name}`);
      const characterOrigin = getByText(`Origin: ${character.origin.name}`);
      const characterGender = getByText(`Gender: ${character.gender}`);
      const characterImage = getAllByAltText(character.name);

      expect(characterName).toBeInTheDocument();
      expect(characterLocation).toBeInTheDocument();
      expect(characterOrigin).toBeInTheDocument();
      expect(characterGender).toBeInTheDocument();
      expect(characterImage).toHaveLength(1);
      expect(characterImage[0]).toHaveAttribute('src', character.image);
    });
  });

  it('no muestra characters cuando la lista de characters está vacía', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <ItemList characters={[]} />
      </BrowserRouter>
    );

    expect(queryByText('Rick Sanchez')).not.toBeInTheDocument();
    expect(queryByText('Morty Smith')).not.toBeInTheDocument();
  });
});
