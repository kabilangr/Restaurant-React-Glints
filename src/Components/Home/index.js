import React, { useEffect, useState } from "react";
import "./style.css";

import { PopupView } from "./PopupView";
import Navigation from '../Navigation';

const Home = (props) => {

    const [restaurant,setRestaurant] = useState([])
    const [searchName, setSearchName] = useState("")
    const [day, setDay] = useState("All")  
    const [time, setTime] = useState(null)  
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
       fetchAll() 
    },[])

    const fetchAll = () => {
        setIsLoading(true)
        setRestaurant([])
        const url = 
            `https://thawing-ravine-84836.herokuapp.com/restaurant/search?search=${searchName}&day=${day ? day: "All"}&time=${time?time : null}`
        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                setRestaurant(response)
                setIsLoading(false)
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
                        <div className="card-text">
                            {props.timeline.Monday&&<p className="days-text">Monday: {props.timeline.Monday}</p>}
                            {props.timeline.Tuesday&&<p className="days-text">Tuesday: {props.timeline.Tuesday}</p>}
                            {props.timeline.Wednesday&&<p className="days-text">Wednesday: {props.timeline.Wednesday}</p>}
                            {props.timeline.Thursday&&<p className="days-text">Thursday: {props.timeline.Thursday}</p>}
                            {props.timeline.Friday&&<p className="days-text">Friday: {props.timeline.Friday}</p>}
                            {props.timeline.Saturday&&<p className="days-text">Saturday: {props.timeline.Saturday}</p>}
                            {props.timeline.Sunday&&<p className="days-text">Sunday: {props.timeline.Sunday}</p>}
                            </div>
                    </div>
                </div>
                <div className="card-btn">
                <PopupView restaurant={props.name} timeslot={props.timeline.timeline.join("/")}/>
                    {/* <a href onClick={() => {
                        console.log(props.timeline.timeline.join("/"))
                        console.log("yellow")
                    }}>+</a> */}
                </div>
            </div>
        )
    }

    const handleSearch = () => {
        console.log(searchName,day,time)
        fetchAll()
    }

    return (
        <div className="Home">
            <Navigation {...props} />
            <div className="input-container">
                <input type="text" className="input" placeholder="search..." value={searchName} 
                    onChange={(e) =>{
                        setSearchName(e.target.value)
                        // e.preventDefault()
                    }} />
                <select className="input" onChange={(e) => setDay(e.target.value)}>
                    <option value="ALL">All</option>
                    <option value="Mon">Monday</option>
                    <option value="Tues">Tuesday</option>
                    <option value="Weds">Wednesday</option>
                    <option value="Thu">Thursday</option>
                    <option value="Fri">Friday</option>
                    <option value="Sat">Saturday</option>
                    <option value="Sun">Sunday</option>
                </select>
                <input type="time" className="input" id="appt" onChange={(e) => setTime(e.target.value)} name="appt" />
                <input type="button" className="input" value="Search" onClick={handleSearch} />
            </div>
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