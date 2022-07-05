import React, { useState,useEffect } from "react"
import { Card, Button,Dropdown,DropdownButton,Pagination,Spinner } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"

const Trending = ({genres,apiKey,translations, language}) => {
    const [movies,setMovies] = useState([])
    const [genre,setGenre] = useState("")
    const [genreName,setGenreName] = useState("")
    const [page,setPage] = useState(1)

    useEffect(async()=>{
      if(genre===""){
        await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&page=${page}`)
        .then(result=>setMovies(result.data.results))
      } else{
        await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&with_genres=${genre}&page=${page}`)
        .then(result=>setMovies(result.data.results))
      }
    },[genre,page,language])

    let items = [];
    for (let number = page; number <= page+4; number++) {
      items.push(
        <Pagination.Item onClick={()=>setPage(number)} key={number} active={number === page}>
          {number}
        </Pagination.Item>,
      );
    }
    return (
        <>
        <DropdownButton  style={{display:"inline", marginLeft:"11vw"}} id="dropdown-basic-button" className="dropdown-genre" title={translations.genreDropdown}>
            <Dropdown.Item onClick={()=>{setGenre("") 
            setGenreName("")}}>{translations.allGenres}</Dropdown.Item>
            {genres.map(genre=>{
            return <Dropdown.Item onClick={()=>{setGenre(genre.id)
            setGenreName(genre.name)}} key={genre.id}>{genre.name}</Dropdown.Item>
          })}

        </DropdownButton>
        <span style={{display:"inline"}} className="current-genre">{genreName}</span>
        <div className="trending-container">
        {movies.length === 0 && <Spinner style={{margin:"10px 0 0 100px"}}  animation="border"/>}
            {movies.map(movie=>{
                const imageSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                const linkDetail = `/movie/${movie.id}`
                return <Card key={movie.id}>
                <Card.Img variant="top" src={imageSrc} />
                <Card.Body>
                  <Card.Title className="trending-title">{movie.title}</Card.Title>
                  <Card.Text>
                    {movie.overview}
                  </Card.Text>
                  <Button variant="primary"><Link to={linkDetail}>{translations.viewInformation}</Link></Button>
                </Card.Body>
              </Card>
            })}
        </div>
        <Pagination>
                <Pagination.First onClick={()=>setPage(1)}/>
                <Pagination.Prev onClick={()=>setPage(page-1)}/>
                {items}
                <Pagination.Next onClick={()=>setPage(page+1)}/>
                <Pagination.Last onClick={()=>setPage(page+20)}/>
            </Pagination>
          <br />
        </>
    )
}

export default Trending