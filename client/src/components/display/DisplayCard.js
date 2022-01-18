import React from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import {useSelector} from "react-redux"

function DisplayCard({creation, displayType}) {
    const {thumbnail} = creation
    const user = useSelector(state => state.user.user)
    const creator = creation.creator
    console.log("creator", creation.creator)
    const creationTitle = creation.title
    const title = creationTitle.replace(/[.,/#!$?%^&*;:{}=-_`~()]/g, "")
    console.log('title', title)

    return (
        <Card style={{"maxWidth" : "200px"}}>
            <Card.Img src={thumbnail} />
            <Card.Body>  
                <Card.Title>
                    {creation.title}
                </Card.Title>
                {displayType === "writing" ? "✒️": null}
                {displayType === "audio" ? "🔊": null}
                {displayType === "art" ? "🖌️": null}
                {displayType === "video" ? "🎥": null}
                <Link to={`/view/${displayType}/${user.username}/${creator.name}/${title}/${creation.id}`}><Button variant="success">View</Button></Link>
            </Card.Body>
        </Card>
    )
}

export default DisplayCard
