import React from 'react'

function Pagination({totalRecipes , recipesPerPage , paginate}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes/recipesPerPage) ; i++) {
    pageNumbers.push(i);
  }
  
    return (
    <nav>
        <ul>
            {pageNumbers.map(number => (
                <li key={number}>
                    <button onClick={()=> paginate(number)} href="">
                        {number}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination