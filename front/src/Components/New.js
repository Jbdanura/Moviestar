import React, { useEffect, useState } from "react"
import axios from "axios"
import {Button,Pagination,Dropdown,DropdownButton, Spinner} from "react-bootstrap"

const New = ({genres,apiKey,translations, language}) => {
    const [movies, setMovies]  = useState([])
    const [page,setPage] = useState(1)
    const [genre,setGenre] = useState("")
    const [genreName,setGenreName] = useState("")

    useEffect(async()=>{
        if(genre===""){
          await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&page=${page+70}`)
          .then(result=>setMovies(result.data.results))
        } else{
          await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&with_genres=${genre}&page=${page+70}`)
          .then(result=>setMovies(result.data.results))
        }
        window.scrollTo(0,0)
    },[genre,page, language])


    let items = [];
    for (let number = page; number <= page+4; number++) {
      items.push(
        <Pagination.Item onClick={()=>setPage(number)} key={number} active={number === page}>
          {number}
        </Pagination.Item>,
      );
    }
    if(!translations){
      return null
    } else {
      return (
        <>
        <h3 className="individual-title">{translations.newTitle}</h3>
        <DropdownButton  style={{display:"inline",marginLeft:"11vw"}} id="dropdown-basic-button" className="dropdown" title={translations.genreDropdown}>
            <Dropdown.Item onClick={()=>{setGenre("") 
            setGenreName("")}}>{translations.allGenres}</Dropdown.Item>
            {genres.map(genre=>{
            return <Dropdown.Item onClick={()=>{setGenre(genre.id)
            setGenreName(genre.name)}} key={genre.id}>{genre.name}</Dropdown.Item>
          })}
        </DropdownButton>
        <span style={{display:"inline"}} className="current-genre">{genreName}</span>
            <div className="card-container">
                {movies.length === 0 && <Spinner style={{margin:"10px 0 0 200px"}}  animation="border"/>}
                {movies.map(movie=>{
                    const imgSrc = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                    return (
                        <div className="card-item new-item" key={movie.id}>
                            <img className="new-img" alt={movie.title} src={imgSrc}></img>
                            <div className="info">
                                <h4>{movie.title}</h4>
                                <h6>{translations.release} {movie.release_date}</h6>
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
                <Pagination.Last onClick={()=>setPage(page+20)}/>
            </Pagination>
            <br />
        </>
    )}
}

export default New