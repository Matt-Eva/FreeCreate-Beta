import React from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"

function MyCreationDisplayCard({creation, displayType}) {
    const {thumbnail} = creation
    const creationTitle = creation.title
    const title = creationTitle.replace(/[.,/#!$?%^&*;:{}=-_`~()]/g, "")
    const dispatch = useDispatch()


    function editCreation(){

    }

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
                <Link to={`/edit/${displayType}`}><Button variant="success" onClick={editCreation}>Edit</Button></Link>
                <Link to={`/view/${displayType}/${title}/${creation.id}`}><Button variant="success">View</Button></Link>
            </Card.Body>
        </Card>
    )
}

export default MyCreationDisplayCard
