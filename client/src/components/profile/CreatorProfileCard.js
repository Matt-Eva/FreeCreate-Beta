import React from 'react'
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setEditCreator } from "../../state/editCreatorSlice"

function CreatorProfileCard({creator}) {
    const dispatch = useDispatch()
    function editCreator(){
        dispatch(setEditCreator(creator))
    }
    return (
        <div>
            <h4>{creator.name}</h4>
            {creator.prof_pic !== null ? <img style={{"height" : "100px"}} src={creator.prof_pic} /> : <p>No profile picture</p>}
            <Link to="/editcreator"><Button variant="success" onClick={editCreator}>Edit</Button></Link>
        </div>
    )
}

export default CreatorProfileCard
