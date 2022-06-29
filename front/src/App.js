import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Menu from './Components/menu';
import Slider from './Components/slider';
import Trending from './Components/trending';

const App = () => { 
   const [genres,setGenres] = useState([])
   const [trending, setTrending] = useState([])
   useEffect(async()=>{
      const genresPromise = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=9f7f4f34ea20d12820b0e5ad63549cf5&language=en-US")
      setGenres(genresPromise.data.genres)
      const trendingPromise = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=9f7f4f34ea20d12820b0e5ad63549cf5&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate")
      setTrending(trendingPromise.data.results)
   }, [])

   return(
        <div>
            <Menu genres={genres}/>
            <div className="carousel-container">
               <h3>Trending movies</h3>
               <Slider trending={trending}/>
            </div>
            <Trending trending={trending}/>
       </div>
      );
}

export default App;