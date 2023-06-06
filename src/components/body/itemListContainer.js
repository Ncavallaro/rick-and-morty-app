import React, { useEffect, useState } from 'react';
import '../../css/body/itemListContainer.css'
import ItemList from '../body/itemList';
import fetchCharacters from '../../api/apiConnect';
import Pagination from '../body/pagination';
import Search from '../body/search';

const ItemListContainer = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [locationFilter, setLocationFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters(currentPage, locationFilter, nameFilter);
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    };
    fetchData();
  }, [currentPage, locationFilter, nameFilter]);

  const resetFilters = () => {
    setNameFilter('');
    setLocationFilter('');
  };

  const handleNextPage = () => {
    resetFilters();
    setCurrentPage(currentPage + 1);
  };
    
  const handlePreviousPage = () => {
    resetFilters();
    setCurrentPage(currentPage - 1);
  };
  
  const handleLocationFilterChange = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setLocationFilter(event.target.previousSibling.value);
  };

  const handleNameFilterChange = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setNameFilter(event.target.previousSibling.value);
  };

  return (
    <>
      <div id='contanierBody'>
        <div className="container-fluid">
              <Search
                handleNameFilterChange={handleNameFilterChange}
                handleLocationFilterChange={handleLocationFilterChange}
              />
        </div>
        <ItemList characters={characters}/>
        <Pagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>    
    </>
  );  
}

export default ItemListContainer;
