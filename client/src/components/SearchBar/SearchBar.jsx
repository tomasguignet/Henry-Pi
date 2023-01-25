import React from 'react'

function SearchBar() {
    return (
        <div>
            <div>
                <label htmlFor='recipeName'>Recipe name:</label>
                <input name='recipeName' type="text" />
            </div>
            
            <div>
                <label htmlFor="dietFilter">Diet filter</label>
                <select name="dietFilter" id="dietFilter"></select>
            </div>
        </div>
    )
}

export default SearchBar