import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'
import { Spinner,Card,Button } from 'react-bootstrap'

const Movie = ({apiKey,translations,language}) => {
  const [movie, setMovie] = useState([])
  const [similar, setSimilar] = useState([])
  const id = useParams().id
  const navigate = useNavigate()

  useEffect(async()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`)
    .then(result=>setMovie(result.data))
    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=${language}&page=1`)
    .then(result=>setSimilar(result.data.results.splice(0,8)))
    window.scrollTo(0,0)
  },[id,language])

  const movieDetails = () => {
    const imgSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    return (
        <div className="movie-detail">
            <img src={imgSrc}/>
            <div className="info">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <h6 style={{margin:"30px 0"}}>{translations.release} {movie.release_date}</h6>
                <span>{translations.genres}</span>
                <ul className="genres">
                    {movie.genres.map(genre=>{
                        return <li key={genre.name}>{genre.name}</li>
                    })}
                </ul>
                
                <span>{translations.similar}</span>
                <div className="similar">
                    {similar.map(movie=>{
                        const similarImgSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                        return <Card key={movie.id} className="similar-movie" >
                        <Card.Img variant="top" src={similarImgSrc}  />
                        <Card.Body>
                          <Card.Title>{movie.title}</Card.Title>
                          <Button variant="secondary" onClick={()=>navigate("/movie/"+movie.id)}>+ Info</Button>{' '}
                        </Card.Body>
                        </Card>
                    })}
                </div>
            </div>
        </div>
    )
  }

  return (
    <div>
        {movie.length === 0 || similar.length === 0 ?  <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        : movieDetails()
        }
    </div>
  )
}

export default Movie