const fetchCharacters = async (currentPage, locationFilter, nameFilter) => {
    const URL_API = `https://rickandmortyapi.com/api/character/?page=${currentPage}&location=${locationFilter}&name=${nameFilter}`

    try {
      const response = await fetch(
        URL_API
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
  export default fetchCharacters;