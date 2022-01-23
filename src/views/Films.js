import React, {useEffect, useState} from 'react'
import { movies$ } from '../data/movies'

// components
import Card from "../components/Card"
import Filter from '../components/Filter'
import Search from '../components/Search'
import Pagination from '../components/Pagination'

// css
import '../css/Films.css'

const Films = () => {

    const [data, setData] = useState([])

    const [filter, setFilter] = useState("")
    const [search, setSearch] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPages, setItemsPerPages] = useState(4)

    //  Récupération des films
    useEffect(() => {
        movies$.then((res) => setData(res))
    }, [])

    // Partie config pagination
    const indexOfLastItem = currentPage * itemsPerPages
    const indexOfFirtsItem = indexOfLastItem - itemsPerPages
    const currentItems = data.slice(indexOfFirtsItem, indexOfLastItem)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // Partie config suppression
    const handleDelete = (id) => {
        console.log(id)
        let newData = data.filter(item => item.id !== id)
        console.log(newData)
        setData(newData)
    }

    // Partie config filtre des catégories
    const getFilter = (input, field) => {
        let output = []
        for (let i = 0; i < input.length; ++i) output.push(input[i][field])
        return output
    }

    let results = new Set(getFilter(data, "category"))
    let categoriesArray = [...results]

    return (
        <div>

            <div className='page-header'>
                <h1>React Interview | Makroum Marouane</h1>
            </div>

            <div className='header-options'>
                <Search setSearch={setSearch} />
                <br />
                <Filter array={categoriesArray} setFilter={setFilter} />
                <br />
                <div className='change-items-per-pages'>
                    <label style={{margin: "auto 0"}}>Nombres de films par page :</label>
                    <ul>
                        <li className='numbers-of-items' onClick={() => setItemsPerPages(4)}>4</li>
                        <li className='numbers-of-items' onClick={() => setItemsPerPages(8)}>8</li>
                        <li className='numbers-of-items' onClick={() => setItemsPerPages(12)}>12</li>
                    </ul>
                </div>
            </div>

            <div className='card-container'>
                {
                    search !== "" ? currentItems.filter((item) => {
                        return item.title.toLowerCase().includes(search.toLowerCase())
                    }).map((item, index) => (
                        <Card key={index} item={item} index={item.id} handleDelete={handleDelete}/>
                    )) // Gère un retour selon le champ de recherche
                    :
                    filter === "" ? currentItems.map((item, index) => (
                        <Card key={index} item={item} index={item.id} handleDelete={handleDelete}/>
                    )) // Affiche tout les films par défaut
                    :
                    currentItems.filter((item) => {
                        return item.category.includes(filter)
                    }).slice(indexOfFirtsItem, indexOfLastItem).map((item, index) => (
                        <Card key={index} item={item} index={item.id} handleDelete={handleDelete}/>
                    ))  // Gère un retour selon le champ de tri des catégories
                }
            </div>
            
            <Pagination itemsPerPages={itemsPerPages} totalItems={data.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

        </div>
    )
}

export default Films