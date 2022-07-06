import React, { useEffect, useState } from "react"
import axios from "axios"
import {Button,Pagination,Dropdown,DropdownButton, Spinner} from "react-bootstrap"
import { Link } from "react-router-dom"

const Top = (props) => {
    const [movies, setMovies]  = useState([])
    const [page,setPage] = useState(1)
    const [genre,setGenre] = useState("")
    const [genreName,setGenreName] = useState("")

    useEffect(async()=>{
        if(genre===""){
          await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=${props.language}&sort_by=vote_count.desc&page=${page}`)
          .then(result=>setMovies(result.data.results))
        } else{
          await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=${props.language}&sort_by=vote_count.desc&with_genres=${genre}&page=${page}`)
          .then(result=>setMovies(result.data.results))
        }
        window.scrollTo(0,0)
    },[genre,page,props.language])

    let items = [];
    for (let number = page; number <= page+4; number++) {
      items.push(
        <Pagination.Item onClick={()=>setPage(number)} key={number} active={number === page}>
          {number}
        </Pagination.Item>,
      );
    }
    if(!props.translations){
        return null
    } else {
        return (
        <>
            <h3 className="individual-title">{props.translations.topTitle}</h3>
            <DropdownButton  style={{display:"inline", marginLeft:"11vw"}} id="dropdown-basic-button" className="dropdown" title={props.translations.genreDropdown}>
                <Dropdown.Item onClick={()=>{setGenre("") 
                setGenreName("")}}>{props.translations.allGenres}</Dropdown.Item>
                {props.genres.map(genre=>{
                return <Dropdown.Item onClick={()=>{setGenre(genre.id)
                setGenreName(genre.name)}} key={genre.id}>{genre.name}</Dropdown.Item>
            })}
            </DropdownButton>
            <span style={{display:"inline"}} className="current-genre">{genreName}</span>
            <div className="card-container">
                {movies.length === 0 && <Spinner style={{margin:"10px 0 0 200px"}}  animation="border"/>}
                {movies.map(movie=>{
                    const imgSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    const linkDetail = `/movie/${movie.id}`
                    return (
                        <div className="card-item" key={movie.id}>
                            <img src={imgSrc}></img>
                            <div className="info">
                                <h4>{movie.original_title}</h4>
                                <p>{movie.overview}</p>
                                <Button variant="info"><Link to={linkDetail}>{props.translations.moreInfo}</Link></Button>{' '}
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

export default Top