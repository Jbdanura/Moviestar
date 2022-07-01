import React, { useEffect, useState } from "react"
import axios from "axios"
import {Button } from "react-bootstrap"

const Top = (props) => {
    const [top, setTop]  = useState([])

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&sort_by=vote_count.desc&page=1&`)
        .then(result => setTop(result.data.results))
    },[])

    return (
        <>
            <h3 className="top-title">Top movies of all time</h3>
            <div className="top-container">
                {top.map(movie=>{
                    const imgSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    return (
                        /*<Card key={movie.id}>
                            <Card.Img variant="top" src={imgSrc} />
                            <Card.Body>
                                <Card.Title>{movie.original_title}</Card.Title>
                                <Card.Text>
                                {movie.overview}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>*/
                        <div className="top-card">
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
        </>
    )
}

export default Top