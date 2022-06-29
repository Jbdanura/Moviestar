import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Menu from './Components/menu';
import { Carousel } from 'react-bootstrap';
const App = () => { 
   const [genres,setGenres] = useState([])
   const [trending, setTrending] = useState([])
   const [trendingDescription, setTrendingDescription] = useState("")

   useEffect(async()=>{
      const genresPromise = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=9f7f4f34ea20d12820b0e5ad63549cf5&language=en-US")
      setGenres(genresPromise.data.genres)
      const trendingPromise = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=9f7f4f34ea20d12820b0e5ad63549cf5&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate")
      .then(response => setTrending(response.data.results))
   }, [])

   return(
        <div>
            <Menu genres={genres}/>
            <div className="carousel-container">
               <h2>Trending movies</h2>
               <Carousel>
                  {trending.slice(0,10).map((movie => {
    
                     const imageSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                     return <Carousel.Item>
                        <img
                           className="d-block w-100 carousel-img"
                           src={imageSrc}
                           alt={movie.original_title}
                        />
                        <Carousel.Caption>
                           <h3>{movie.original_title}</h3>
                        </Carousel.Caption>
                     </Carousel.Item>
                  }))}
               </Carousel>
  
            </div>
       </div>
      );
}

export default App;