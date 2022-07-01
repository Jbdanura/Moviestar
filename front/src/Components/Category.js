import React from 'react'
import { useParams } from 'react-router-dom'

const Category = ({apiKey}) => {
  const category = useParams().category
  return (
    <div>
        <h3>{category} movies</h3>
        {category}
    </div>
  )
}

export default Category