import React from "react"
import Slider from "./slider"
import Trending from "./trending"

const Home = ({trending,genres,apiKey,translations,language}) => {
    if(!translations){
        return null
    } else{
    return (
        <>
        <div className="carousel-container">
        <h3>{translations.trendingTitle}</h3>
        <Slider trending={trending}/>
        </div>
        <Trending genres={genres} apiKey={apiKey} translations={translations} language={language}/>
        </>
        )
    }
}

export default Home