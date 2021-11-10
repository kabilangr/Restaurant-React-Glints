import React, { useEffect, useState } from "react";
import "./style.css";

import Navigation from '../Navigation';

const Home = (props) => {

    const [restaurant,setRestaurant] = useState()
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
       fetchAll() 
    },[])

    const fetchAll = () => {
        setIsLoading(true)
        const url = "https://thawing-ravine-84836.herokuapp.com/restaurant"
        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                setRestaurant(response)
                setIsLoading(false)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }

    const name = (name) => {
        if(name && name.length>22)
        name = name.substring(0,19) + "..."
        return name
    }

    const Card = (props) => {
        return(
            <div className="card-details">
                <div className="card-div">
                    <h3 className="card-title">{name(props.name)}</h3>
                    <div className="card-body">
                        <p className="card-text">
                            Monday: {props.timeline.Monday}<br/>
                            Tuesday: {props.timeline.Tuesday}<br/>
                            Wednesday: {props.timeline.Wednesday}<br/>
                            Thursday: {props.timeline.Thursday}<br/>
                            Friday: {props.timeline.Friday}<br/>
                            Saturday: {props.timeline.Saturday}<br/>
                            Sunday: {props.timeline.Sunday}
                            </p>
                    </div>
                </div>
                <div className="card-btn">
                    <a href onClick={() => {
                        console.log("yellow")
                    }}>+</a>
                </div>
            </div>
        )
    }

    return (
        <div className="Home">
            <Navigation {...props} />
            <div className="home-body">
                {isLoading && <div className="loader"></div>}
                <div className="card-container">
                    {restaurant && restaurant.map((data,index) => <Card key={index} {...data}/> )}
                </div>
            </div>
        </div>
    )
}

export default Home;