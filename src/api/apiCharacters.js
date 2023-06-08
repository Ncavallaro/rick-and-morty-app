import { useEffect, useState } from 'react';

const useFetchCharacter = (id) => {
  const [character, setCharacter] = useState(null);
  const URL_API_CHARACTER_ID = `https://rickandmortyapi.com/api/character/${id}`;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(URL_API_CHARACTER_ID);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacter();
  }, [id]);

  return character;
};

export default useFetchCharacter;
