import Container from "react-bootstrap/container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import {useSelector} from "react-redux"
import { useState } from "react"
import TopNav from "../navigation/TopNav"

function CreateCreatorProfile() {
    const user = useSelector(state => state.user.user)
    const [creatorName, setCreatorName] = useState("")
    const [creatorThumbnail, setCreatorThumbnail] = useState(null)
    const [thumbnailDisplay, setThumbnailDisplay] = useState(null)
    const [loading, setLoading] = useState(false)

    function picChangeHandler(e){
        const thumbnail = e.target.files[0]
        if (thumbnail.name.endsWith(".jpg") || thumbnail.name.endsWith(".jpeg") ){
            setCreatorThumbnail(thumbnail)
        } else if (thumbnail.name.endsWith(".png")){
            setCreatorThumbnail(thumbnail)
        } else{
            alert("That is not an appropriate image file.")
        } 
    }

    function submitPic(e){
        e.preventDefault()
        setLoading(true)
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
            .then(r => {
                console.log(r)
                if (r.ok){
                    r.json()
                    .catch(error => console.log(error))
                    .then(data =>{
                        setThumbnailDisplay(data.secure_url)
                        setLoading(false)
                    })
                } else{
                    setLoading(false)
                    alert("You did not select a valid image file")
                }
            })     
        } else {
            alert("please select an image")
            setLoading(false)
        }
    }


    function nameChange(e){
        setCreatorName(e.target.value)
    }

    function submitCreator(e){
        e.preventDefault()
        const creatorData = {
            user_id: user.id,
            name: creatorName,
            prof_pic: thumbnailDisplay,
            is_writer: false,
            is_audio: false,
            is_artist: false,
            is_video: false,
            payment_info: null
        }
    }

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <h1>Create Creator</h1>
                </Col>
                <Col>
                    {loading ? <p>Loading Profile pic...</p> : null}
                    {thumbnailDisplay === null ? null : <Image src={thumbnailDisplay} style={{"height": "100px"}}/>}
                    {thumbnailDisplay === null ? null : <Button onClick={() => setThumbnailDisplay(null)}>Remove Photo</Button>}
                </Col>
            </Row>
           <Row>
                {thumbnailDisplay === null ? <Form onSubmit={submitPic} >
                    <Form.Group>
                        <Form.Label>Upload your Creator profile picture <em>(Optional)</em></Form.Label>
                        <Form.Control type="file" name="file" onChange={picChangeHandler}/>
                        <Button type="submit">Add Prof Pic</Button>
                    </Form.Group>
                </Form> : null}
            </Row>
            <Form onChange={nameChange} onSubmit={submitCreator}>
                <Form.Group>
                    <Form.Label>Creator Name:</Form.Label>
                    <Form.Control type="text" name="name" value={creatorName}/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group>
                    <Form.Label>How would you describe yourself? (Select all that apply)</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Writer</Form.Label>
                    <Form.Check type="switch" checked={false}/>
                    <Form.Label>Musician / Audio Producer</Form.Label>
                    <Form.Check type="switch"/>
                    <Form.Label>Visual Artist / Photographer</Form.Label>
                    <Form.Check type="switch"/>
                    <Form.Label>Video / Film Maker </Form.Label>
                    <Form.Check type="switch"/>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default CreateCreatorProfile
