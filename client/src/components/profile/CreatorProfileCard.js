import React from 'react'
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"

function CreatorProfileCard({creator}) {
    return (
        <div>
            <h4>{creator.name}</h4>
            {creator.prof_pic !== null ? <img style={{"height" : "100px"}} src={creator.prof_pic} /> : <p>No profile picture</p>}
            <Link to="/editcreator"><Button>Edit</Button></Link>
        </div>
    )
}

export default CreatorProfileCard
