import React from 'react'

function Pagination({totalRecipes , recipesPerPage , paginate}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalRecipes/recipesPerPage) ; i++) {
    pageNumbers.push(i);
  }
  
    return (
    <nav>
        <ul>
            {pageNumbers.map(number => (
                <li>
                    <a onClick={()=> paginate(number)} href="">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination