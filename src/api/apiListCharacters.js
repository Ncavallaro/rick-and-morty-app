import { useEffect, useState } from 'react';

const useFetchCharacters = (currentPage, locationFilter, nameFilter) => {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const URL_API_CHARACTERS = `https://rickandmortyapi.com/api/character/?page=${currentPage}&location=${locationFilter}&name=${nameFilter}`

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(URL_API_CHARACTERS);
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters();
  }, [currentPage, locationFilter, nameFilter]);

  return { characters, totalPages };
};

export default useFetchCharacters;
