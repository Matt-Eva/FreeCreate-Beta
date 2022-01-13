import React from 'react'
import Card from "react-bootstrap/Card"

function DisplayCard({creation}) {
    const {title, thumbnail} = creation
    return (
        <Card>
            <Card.Image src={thumbnail} />
            <Card.Body>  
                <Card.Title>
                    {title}
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default DisplayCard
