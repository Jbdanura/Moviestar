import React from "react"
import { Carousel } from 'react-bootstrap';

const Slider = ({trending}) => {
    return(
        <Carousel>
        {trending.slice(0,7).map((movie => {
           const imageSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
           return <Carousel.Item key={movie.id}>   
                 <img
                    className="d-block w-100 carousel-img"
                    src={imageSrc}
                    alt={movie.original_title}
                 />
              <Carousel.Caption>
                 <h2>{movie.original_title}</h2>
              </Carousel.Caption>
           </Carousel.Item>
        }))}
     </Carousel>
    )
}

export default Slider