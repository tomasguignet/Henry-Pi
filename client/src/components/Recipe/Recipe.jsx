import React from 'react'

function Recipe({id, image, name, diets, healthScore}) {
  return (
    <div>
        <div>
            <img src={image} alt="Recipe image" />
        </div>

        <div>
            <h1>{name}</h1>
        </div>

        <div>
            {diets.map(diet =>(
                <h3>{diet}</h3>
            ))}
        </div>
    </div>
  )
}

export default Recipe