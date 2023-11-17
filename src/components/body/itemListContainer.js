import React, { useState } from 'react'
import '../../css/body/itemListContainer.css'
import ItemList from '../body/itemList'
import Pagination from '../body/pagination'
import Search from '../body/search'
import useFetchCharacters from '../../api/apiListCharacters'

const ItemListContainer = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [locationFilter, setLocationFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const { characters, totalPages } = useFetchCharacters(
    currentPage,
    locationFilter,
    nameFilter
  )

  const resetFilters = () => {
    setNameFilter('')
    setLocationFilter('')
  }

  const handleNextPage = () => {
    resetFilters()
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      resetFilters()
      setCurrentPage(currentPage - 1)
      console.log(totalPages)
    }
  }

  const handleLocationFilterChange = (event) => {
    event.preventDefault()
    setCurrentPage(1)
    setLocationFilter(event.target.previousSibling.value)
  };

  const handleNameFilterChange = (event) => {
    event.preventDefault()
    setCurrentPage(1)
    setNameFilter(event.target.previousSibling.value)
  }

  return (
    <>
      <div id='contanierBody'>
        <div className='container-fluid' id='containerSearches'>
          <Search
            handleNameFilterChange={handleNameFilterChange}
            handleLocationFilterChange={handleLocationFilterChange}
          />
        </div>
        <ItemList characters={characters} />
        <Pagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </>
  )
}

export default ItemListContainer
