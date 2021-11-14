import "./style.css"
import React, { useEffect, useState } from "react"
import dropDown from "../../assets/image/dropDown5.png"

const CollectionBody = ({restaurant, timing}) => {
        
    return (
        <div className="list-body-card">
            <h4>{restaurant}</h4>
            <h4>{timing}</h4>
        </div>
    )
}

export const CollectionList = (list) => {
    
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="collection-list">
            <div className="collection-list-name">
                    <h2 className="list-title">{list.name}</h2>
                    <img src={dropDown}  
                        onClick={() => setIsVisible(!isVisible)} 
                        className={isVisible?"dropdown-img1":"dropdown-img"} alt="LOGO" />
            </div>
            {isVisible &&
                <div className="collection-body-container">
                    {list.list && list.list.length >0 ? 
                        list.list.map((item) => {
                            return (
                                <CollectionBody {...item} />
                            )
                        }): 
                        <h4 style={{textAlign: "center"}}>No Restaurant Added</h4>
                    }
                </div>
            }
        </div>
    )
}