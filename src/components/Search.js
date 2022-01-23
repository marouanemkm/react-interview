import React from 'react'
import '../css/Search.css'

const Search = ({setSearch}) => {
    return (
        <>
            <input className='search' type="text" placeholder='Rechercher un film...' name="form-search" onChange={(e) => setSearch(e.target.value)} />
        </>
    )
}

export default Search