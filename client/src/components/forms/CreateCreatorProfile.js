import React from 'react'
import TopNav from "../navigation/TopNav"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import {useSelector} from "react-redux"
import { useState } from "react"

function CreateCreatorProfile() {
    const user = useSelector(state => state.user.user)
    const [creatorData, setCreatorData] = useState({
        user_id: null,
        name: "",
        prof_pic: "",
        is_writer: false,
        is_audio: false,
        is_artist: false,
        is_video: false,
        payment_info: null
    })
    const [creatorThumbnail, setCreatorThumbnail] = useState(null)
    const [thumbnailDisplay, setThumbnailDisplay] = useState(null)
    console.log(user)

    function picChangeHandler(e){
        // console.log(e.target)
        const thumbnail = e.target.files[0]
        console.log(thumbnail)
        setCreatorThumbnail(thumbnail)
    }

    function submitPic(e){
        e.preventDefault()
        if (creatorThumbnail instanceof File){
        const cloudinaryUrl = "https://api.cloudinary.com/v1_1/freecreate/image/upload"
        const fd = new FormData()
        fd.append('file', creatorThumbnail)
        fd.append('upload_preset', 'you-create')
        const configObj = {
            method: "POST",
            body: fd
        }
        fetch(cloudinaryUrl, configObj)
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            console.log(data.secure_url)
            setThumbnailDisplay(data.secure_url)
            })     
        } else {
            alert("please select an image")
        }
    }

    return (
        <div>
            <TopNav />
            <h1>Create Creator</h1>
            {thumbnailDisplay === null ? null : <Image src={thumbnailDisplay} style={{"height": "100px"}}/>}
            {thumbnailDisplay === null ? <Form onSubmit={submitPic} >
                <Form.Group>
                    <Form.Label>Upload your Creator profile picture <em>(Optional)</em></Form.Label>
                    <Form.Control type="file" name="file" onChange={picChangeHandler}/>
                    <Button type="submit">Add Prof Pic</Button>
                </Form.Group>
            </Form> : <Button onClick={() => setThumbnailDisplay(null)}>Remove Photo</Button>}
        </div>
    )
}

export default CreateCreatorProfile
