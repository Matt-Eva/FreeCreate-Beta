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
        <Card style={{"width": "250px", "height": "340px"}} className="mt-2 mb-2">
            <Link to={`/view/${displayType}/${title}/${creation.id}`} title={creation.title}><Card.Img src={thumbnail} style={{"height": "250px"}}/></Link>
            <Card.Body>  
                <Card.Title className="text-truncate">
                    <Link to={`/view/${displayType}/${title}/${creation.id}`} title={creation.title}>{creation.title}</Link>
                </Card.Title>
                {displayType === "writing" ? "✒️": null}
                {displayType === "audio" ? "🔊": null}
                {displayType === "art" ? "🖌️": null}
                {displayType === "video" ? "🎥": null}
            </Card.Body>
        </Card>
    )
}

export default DisplayCard
