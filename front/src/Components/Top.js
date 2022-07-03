import React, { useEffect, useState } from "react"
import axios from "axios"
import {Button,Pagination,Dropdown,DropdownButton } from "react-bootstrap"

const Top = (props) => {
    const [movies, setMovies]  = useState([])
    const [page,setPage] = useState(1)
    const [genre,setGenre] = useState("All")
    const [genreName,setGenreName] = useState("All")

    useEffect(async()=>{
        if(genre==="All"){
          await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&sort_by=vote_count.desc&page=${page}`)
          .then(result=>setMovies(result.data.results))
        } else{
          await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&sort_by=vote_count.desc&with_genres=${genre}&page=${page}`)
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
            <h3 className="individual-title">Top movies of all time</h3>
            <DropdownButton  style={{display:"inline"}} id="dropdown-basic-button" className="dropdown" title="Genre: ">
                <Dropdown.Item onClick={()=>{setGenre("All") 
                setGenreName("All")}}>All</Dropdown.Item>
                {props.genres.map(genre=>{
                return <Dropdown.Item onClick={()=>{setGenre(genre.id)
                setGenreName(genre.name)}} key={genre.id}>{genre.name}</Dropdown.Item>
            })}
            </DropdownButton>
            <span style={{display:"inline"}} className="current-genre">{genreName}</span>
            <div className="card-container">
                {movies.map(movie=>{
                    const imgSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    return (
                        <div className="card-item" key={movie.id}>
                            <img src={imgSrc}></img>
                            <div className="info">
                                <h4>{movie.original_title}</h4>
                                <p>{movie.overview}</p>
                                <Button variant="info">More Info</Button>{' '}
                            </div>
                        </div>
                    )
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

export default Top