import React from "react"
import Slider from "./slider"
import Trending from "./trending"

const Home = ({trending,genres,apiKey}) => {
    return (
        <>
        <div className="carousel-container">
        <h3>Trending movies</h3>
        <Slider trending={trending}/>
        </div>
        <Trending genres={genres} apiKey={apiKey}/>
        </>
    )
}

export default Home