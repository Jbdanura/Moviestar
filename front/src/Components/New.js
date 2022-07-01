import React, { useEffect, useState } from "react"
import axios from "axios"
import {Button,Pagination } from "react-bootstrap"

const New = ({apiKey}) => {
    const [movies, setMovies]  = useState([])
    const [page,setPage] = useState(1)

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&page=${page+20}`)
        .then(result => setMovies(result.data.results))
    },[page])


    let items = [];
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item onClick={()=>setPage(number)} key={number} active={number === page}>
          {number}
        </Pagination.Item>,
      );
    }

    return (
        <>
            <h3 className="individual-title">New movies</h3>
            <div className="card-container">
                {movies.map(movie=>{
                    const imgSrc = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                    return (
                        <div className="card-item new-item" key={movie.id}>
                            <img className="new-img" alt={movie.original_title} src={imgSrc}></img>
                            <div className="info">
                                <h4>{movie.original_title}</h4>
                                <p>{movie.overview}</p>
                                <h6>Release date: {movie.release_date}</h6>
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

export default New