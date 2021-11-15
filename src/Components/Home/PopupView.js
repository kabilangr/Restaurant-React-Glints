import React, { useEffect, useState } from "react";
import "./style.css";

import CustomModal from "../../utils/CustomModal";


export const PopupView = (props) => {
    const [collection,setCollection] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowmodal] = useState(false)
    useEffect(() => {
        const myStorage = window.sessionStorage
        const id = myStorage.getItem("userIdResta")
        fetchCollection(id)
    },[])



    const addList = (collectionId) => {
        const url = `https://thawing-ravine-84836.herokuapp.com/list/add`
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



    return (
        <div >
            <h2 style={{textAlign: "center"}}>Select the collection</h2>
            <div className="collection-show-list">
            {collection ? collection.map((listData) => 
                <div className="popup-display">
                    <p className="collection-btn" onClick={() => addList(listData.list[0].listId)} >{listData.name}</p>
                </div>
            )
            : <div className="null-collection">
                "no collection"
              </div>
            }
            <button className = "addCollectionBtn" onClick = {() =>setShowmodal(!showModal)}>+ ADD</button>
            {showModal && <CustomModal styles={{background:"grey"}} closeModal={() =>setShowmodal(false)} >
                <AddText  />
            </CustomModal>}
            </div>
        </div>
    )
}

const AddText = (props) => {
    const [collectionAdd, setCollectionAdd] = useState("")
        


    const createCollection = (title) => {
        const myStorage = window.sessionStorage
        const id = myStorage.getItem("userIdResta")
        const url = "https://thawing-ravine-84836.herokuapp.com/collection/create"
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
                if(response.code === 406)
                    alert(response.message)
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
    }


    return (
        <div className="input-forCollection-in">
            <div className="input-forCollection">
                <input value={collectionAdd}
                 onChange={(e) => setCollectionAdd(e.target.value)} placeholder="name"/>
                 <input type="submit" value="Add" onClick={createCollection} />
            </div>
        </div>
    )
}