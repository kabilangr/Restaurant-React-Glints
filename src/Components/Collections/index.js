import "./style.css"
import React, { useEffect, useState } from "react"

import Navigation from "../Navigation"
import { CollectionList } from "./CollectionList"
import CustomModal from "../../utils/CustomModal";

const Collection = (props) => {

    const [collection,setCollection] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowmodal] = useState(false)

    useEffect(() => {
        const myStorage = window.sessionStorage
        const id = myStorage.getItem("userIdResta")
        fetchCollection(id)
    },[])



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



    return(
        <div className="collection">
            <Navigation {...props} />
            <div className="collection-body">
                <div className="collection-container">
                    <h1 className="collection-title">Collection</h1>
                    <button className = "open-popup" onClick = {() =>setShowmodal(!showModal)}>+ Add collection</button>
                    {showModal && <CustomModal styles={{background:"grey"}} closeModal={() =>setShowmodal(false)} >
                        <AddText 
                        fetchCollection={fetchCollection} 
                        setShowmodal={setShowmodal}
                        />
                    </CustomModal>}
                    <br/>
                    {isLoading && <div className="loader1"></div>}
                    {collection && collection.map((list) => 
                        <CollectionList
                            {...list}/>
                    )}
                </div>
            </div>
        </div>
    )
}

const AddText = (props) => {
    const [collectionAdd, setCollectionAdd] = useState("")

    const myStorage = window.sessionStorage
    const id = myStorage.getItem("userIdResta")
    const createCollection = (title) => {
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
                if(response.code === 200) {
                    alert("added succceddful")
                    props.setShowmodal(false)
                }
                props.fetchCollection(id)
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
                    className="input-new-collection"
                    onChange={(e) => setCollectionAdd(e.target.value)} 
                    placeholder="name"
                    />
                    <input type="submit" className="submitBtnCollection" value="Submit" onClick={createCollection} />
                </div>
            </div>
    )
}

export default Collection;