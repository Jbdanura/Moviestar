import React from "react"
import { Card, Button } from "react-bootstrap"

const Trending = ({trending}) => {
    return (
        <div className="trending-container">
            {trending.map(movie=>{
                const imageSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                return <Card key={movie.id}>
                <Card.Img variant="top" src={imageSrc} />
                <Card.Body>
                  <Card.Title>{movie.original_title}</Card.Title>
                  <Card.Text>
                    {movie.overview}
                  </Card.Text>
                  <Button variant="primary">View information</Button>
                </Card.Body>
              </Card>
            })}
        </div>
    )
}

export default Trending