import React, { useEffect, useState } from "react";
import "./style.css";

const Home = () => {

    const [restaurant,setRestaurant] = useState({})
    useEffect(() => {
       fetchAll() 
       console.log(restaurant)
    })

    const fetchAll = () => {
        const url = "https://thawing-ravine-84836.herokuapp.com/restaurant"
        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                // setRestaurant(response)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="Home">
            <p>hello world!</p>
        </div>
    )
}

export default Home;