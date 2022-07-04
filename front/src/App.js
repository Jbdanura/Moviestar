import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Menu from './Components/menu';
import apiKey from './apiKey';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Top from './Components/Top';
import Home from './Components/home';
import New from './Components/New';
import Category from './Components/Category';
import Movie from './Components/Movie';

const App = () => { 
   const [genres,setGenres] = useState([])
   const [trending, setTrending] = useState([])

   useEffect(async()=>{
      const genresPromise = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      setGenres(genresPromise.data.genres)
      const trendingPromise = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1`)
      setTrending(trendingPromise.data.results)
   }, [])

   return(
        <div>
         <BrowserRouter>
            <Menu apiKey={apiKey}/>
            <Routes>
               <Route path="/" element={<Home trending={trending} genres={genres} apiKey={apiKey}/>}/>
               <Route path="/top" element={<Top apiKey={apiKey} genres={genres} />}/>
               <Route path="/new" element={<New apiKey={apiKey} genres={genres}/>}/>
               <Route path="/category/:category" element={<Category apiKey={apiKey}/>}/>
               <Route path="/movie/:id" element={<Movie apiKey={apiKey}/>}/>
            </Routes>
         </BrowserRouter>
       </div>
      );
}

export default App;