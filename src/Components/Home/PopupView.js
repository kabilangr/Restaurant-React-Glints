import React, { useEffect, useState } from "react";
import "./style.css";

import Popup from 'reactjs-popup';


export const PopupView = (props) => {
    const [collection,setCollection] = useState([])
    const [collectionAdd, setCollectionAdd] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const myStorage = window.sessionStorage
        const id = myStorage.getItem("userIdResta")
        fetchCollection(id)
    },[])

    const createCollection = (title) => {
        const myStorage = window.sessionStorage
        const id = myStorage.getItem("userId")
        const url = "http://localhost:3000/collection/create"
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: id,
                name:collectionAdd
            })
        })
            .then((res) => res.json())
            .then(response => {
                if(response.code === 200)
                    alert("added succceddful")
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
    }

    const addList = (collectionId) => {
        const url = `http://localhost:3000/list/add`
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: collectionId,
                restaurant: props.restaurant,
                timing: props.timeslot
            })
        })
            .then((res) => res.json())
            .then(response => {
                if(response.code === 200)
                    alert("added succceddful")
                else if(response.code === 406)
                    alert(response.message)
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
    }

    const fetchCollection = (id) => {
        setIsLoading(true)
        const url = "https://thawing-ravine-84836.herokuapp.com/list"
        fetch(url,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: id
            })
        })
            .then((res) => res.json())
            .then((response) => {
                let data = []
                for(const [key, value] of Object.entries(response.collection)) {
                    data.push({
                        name: key,
                        list: value,
                    })
                }
                setCollection(data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }

    const AddText = () => {
        return (
            <Popup trigger={<button style={{fontSize:20}}>+</button>} position="left center">
                <div className="input-forCollection">
                    <input value={collectionAdd}
                     onChange={(e) => setCollectionAdd(e.target.value)} placeholder="name"/>
                     <input type="submit" value="submit" onClick={createCollection} />
                </div>
            </Popup>
        )
    }

    return (
        <Popup trigger={<button style={{fontSize:20}}>+</button>} position="right center">
            <div className="collection-show-list">
            {collection ? collection.map((listData) => 
                <div>
                    <p className="collection-btn" onClick={() => addList(listData.list[0].listId)} >{listData.name}</p>
                </div>
            )
            : <div>
                "no collection"
              </div>
            }
            <AddText  />
            </div>
        </Popup>
    )
}