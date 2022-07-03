import React, { useState,useEffect } from "react"
import { Card, Button,Dropdown,DropdownButton,Pagination } from "react-bootstrap"
import axios from "axios"

const Trending = ({genres,apiKey}) => {
    const [movies,setMovies] = useState([])
    const [genre,setGenre] = useState("All")
    const [genreName,setGenreName] = useState("All")
    const [page,setPage] = useState(1)

    useEffect(async()=>{
      if(genre==="All"){
        await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}`)
        .then(result=>setMovies(result.data.results))
      } else{
        await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genre}&page=${page}`)
        .then(result=>setMovies(result.data.results))
      }
    },[genre,page])

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
        <DropdownButton  style={{display:"inline"}} id="dropdown-basic-button" className="dropdown" title="Genre: ">
            <Dropdown.Item onClick={()=>{setGenre("All") 
            setGenreName("All")}}>All</Dropdown.Item>
            {genres.map(genre=>{
            return <Dropdown.Item onClick={()=>{setGenre(genre.id)
            setGenreName(genre.name)}} key={genre.id}>{genre.name}</Dropdown.Item>
          })}

        </DropdownButton>
        <span style={{display:"inline"}} className="current-genre">{genreName}</span>
        <div className="trending-container">
            {movies.map(movie=>{
                const imageSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                return <Card key={movie.id}>
                <Card.Img variant="top" src={imageSrc} />
                <Card.Body>
                  <Card.Title className="trending-title">{movie.original_title}</Card.Title>
                  <Card.Text>
                    {movie.overview}
                  </Card.Text>
                  <Button variant="primary">View information</Button>
                </Card.Body>
              </Card>
            })}
        </div>
        <Pagination>
                <Pagination.First onClick={()=>setPage(1)}/>
                <Pagination.Prev onClick={()=>setPage(page-1)}/>
                {items}
                <Pagination.Next onClick={()=>setPage(page+1)}/>
                <Pagination.Last onClick={()=>setPage(20)}/>
            </Pagination>
            <br />
        </>
    )
}

export default Trending