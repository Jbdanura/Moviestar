import React from "react"
import Slider from "./slider"
import Trending from "./trending"

const Home = ({trending}) => {
    return (
        <>
        <div className="carousel-container">
        <h3>Trending movies</h3>
        <Slider trending={trending}/>
        </div>
        <Trending trending={trending}/>
        </>
    )
}

export default Home