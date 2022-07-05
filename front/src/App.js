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
import translationsContent from "./translations.json"

const App = () => { 
   const [genres,setGenres] = useState([])
   const [trending, setTrending] = useState([])

   let userLang = navigator.language || navigator.userLanguage; 
   userLang = userLang.substr(0,2)

   const [language,setLanguage] = useState(userLang)
   const [translations,setTranslations] = useState()

   useEffect(async()=>{
      if(language === "es"){
         setTranslations(translationsContent.Spanish)
      } else{
         setTranslations(translationsContent.English)
      }
      const genresPromise = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`)
      setGenres(genresPromise.data.genres)
      const trendingPromise = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&page=1`)
      setTrending(trendingPromise.data.results)
   }, [language])

   const changeLanguage = (ln) => {
      setLanguage(ln)
   }
   
   return(
        <div>
         <BrowserRouter>
            <Menu apiKey={apiKey} translations={translations} changeLanguage={changeLanguage}/>
            <Routes>
               <Route path="/" element={<Home trending={trending} genres={genres} apiKey={apiKey} />}/>
               <Route path="/top" element={<Top apiKey={apiKey} genres={genres} />}/>
               <Route path="/new" element={<New apiKey={apiKey} genres={genres}/>}/>
               <Route path="/category/:category" element={<Category apiKey={apiKey}/>}/>
               <Route path="/movie/:id" element={<Movie apiKey={apiKey}/>}/>
            </Routes>
         </BrowserRouter>
         <footer>
        <p>Bautista Danura ©</p>
      </footer>
       </div>
      );
}

export default App;