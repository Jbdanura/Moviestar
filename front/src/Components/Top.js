import React, { useEffect, useState } from "react"
import axios from "axios"
import {Button,Pagination } from "react-bootstrap"

const Top = (props) => {
    const [top, setTop]  = useState([])
    const [page,setPage] = useState(1)

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&sort_by=vote_count.desc&page=${page}&`)
        .then(result => setTop(result.data.results))
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
            <h3 className="individual-title">Top movies of all time</h3>
            <div className="card-container">
                {top.map(movie=>{
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