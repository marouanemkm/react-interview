import React from 'react'
import '../css/Pagination.css'

const Pagination = ({ itemsPerPages, totalItems, paginate, currentPage, setCurrentPage }) => {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPages); i++) {
        pageNumbers.push(i)
    }

    return (
        <div class="center">
            <ul class="pagination">
                <li><a onClick={() => { if (currentPage !== 1) setCurrentPage(currentPage - 1) }} href="#">&laquo;</a></li>
                {
                    pageNumbers.map(number => (
                        <li key={number}>
                            <a onClick={() => paginate(number)} className={number === currentPage ? "active" : ''} href="#">{number}</a>
                        </li>
                    ))
                }
                <li><a onClick={() => { if (currentPage !== 3) setCurrentPage(currentPage + 1) }} href="#">&raquo;</a></li>
            </ul>
        </div>
    )
}

export default Pagination