import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>

        <Link to={"/home"}>
            <button>Home</button>
        </Link>
    </div>
  )
}

export default PageNotFound