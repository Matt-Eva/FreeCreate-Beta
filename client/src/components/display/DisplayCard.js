import React from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import {useSelector} from "react-redux"

function DisplayCard({creation, displayType}) {
    const {thumbnail} = creation
    const creationTitle = creation.title
    const title = creationTitle.replace(/[.,/#!$?%^&*;:{}=-_`~()]/g, "")

    return (
        <Card style={{"width": "250px", "height": "340px"}} className="m-2">
            <Link to={`/view/${displayType}/${title}/${creation.id}`} title={creation.title}><Card.Img src={thumbnail} style={{"height": "250px"}}/></Link>
            <Card.Body>  
                <Card.Title className="text-truncate">
                    <Link to={`/view/${displayType}/${title}/${creation.id}`} title={creation.title}>{creation.title}</Link>
                </Card.Title>
                {displayType === "writing" ? <span title="writing" style={{"cursor": "pointer"}}>✒️</span>: null}
                {displayType === "audio" ? <span title="audio" style={{"cursor": "pointer"}}>🔊</span>: null}
                {displayType === "art" ? <span title="visual art" style={{"cursor": "pointer"}}>🖌️</span>: null}
                {displayType === "video" ? <span title="video" style={{"cursor": "pointer"}}>🎥</span>: null}
            </Card.Body>
        </Card>
    )
}

export default DisplayCard
