import React, { useEffect, useState } from 'react';
import '../../css/body/itemListContainer.css'
import ItemList from '../body/itemList';
import Search from '../body/search';

const ItemListContainer = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [locationFilter, setLocationFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        console.log(`https://rickandmortyapi.com/api/character/?page=${currentPage}&location=${locationFilter}&name=${nameFilter}`)
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}&location=${locationFilter}&name=${nameFilter}`
          );
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters();
  }, [locationFilter,nameFilter]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
    
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  
  const handleLocationFilterChange = (event) => {
    event.preventDefault();
    console.log(event.target.previousSibling.value);
    setLocationFilter(event.target.previousSibling.value);
  };

  const handleNameFilterChange = (event) => {
    event.preventDefault();
    console.log(event.target.previousSibling.value);
    setNameFilter(event.target.previousSibling.value);
  };

  return (
    <>
      <div id='contanierBody'>
        <div className="container-fluid">
              <form className="d-flex" role="search">
                <div className='containerSearch'>
                  <input className="form-control me-2" type="search" placeholder="Name" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit" onClick={handleNameFilterChange}>Search</button>
                </div>
                <div className='containerSearch'>
                  <input className="form-control me-2" type="search" placeholder="Location" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit" onClick={handleLocationFilterChange}>Search</button>
                </div>
              </form>
        </div>
        <ItemList characters={characters}/>
        <div className='containerPagination'>
          <button type="button" className="btn btn-outline-success" onClick={handlePreviousPage}>Anterior</button>
          <button type="button" className="btn btn-outline-success" onClick={handleNextPage}>Siguiente</button>
        </div>
      </div>    
    </>
  );  
}

export default ItemListContainer;