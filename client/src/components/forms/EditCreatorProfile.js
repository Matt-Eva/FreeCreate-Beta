import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Modal from 'react-bootstrap/Modal'
import {useSelector, useDispatch} from "react-redux"
import {updateCreators, removeCreator} from "../userauth/creatorsSlice"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import TopNav from "../navigation/TopNav"

function EditCreatorProfile() {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const editCreator = useSelector(state => state.editCreator.editCreator)
    const ref = useRef()
    const navigate = useNavigate()
    const [creatorName, setCreatorName] = useState("")
    const [creatorType, setCreatorType] = useState({
            is_writer:  false,
            is_audio: false,
            is_artist:  false,
            is_video: false,
    })
    const [creatorThumbnail, setCreatorThumbnail] = useState(null)
    const [thumbnailDisplay, setThumbnailDisplay] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() =>{
        if (editCreator === null){
            navigate("/creatorprofiles")
        } else {
            setCreatorName(editCreator.name)
            setCreatorType({
            is_writer:  editCreator.is_writer,
            is_audio: editCreator.is_audio,
            is_artist:  editCreator.is_artist,
            is_video: editCreator.is_video,
            })
            setThumbnailDisplay(editCreator.prof_pic)
        }
    }, [])

    function picChangeHandler(e){
        const thumbnail = e.target.files[0]
        if (thumbnail.name.endsWith(".jpg") || thumbnail.name.endsWith(".jpeg") ){
            setCreatorThumbnail(thumbnail)
        } else if (thumbnail.name.endsWith(".png")){
            setCreatorThumbnail(thumbnail)
        } else{
            alert("That is not an appropriate image file.")
            ref.current.value=""
            console.log(e.target.value)
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
                    ref.current.value=""
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
        if (creatorName !== ""){
            const creatorData = {
                user_id: user.id,
                name: creatorName,
                prof_pic: thumbnailDisplay,
                is_writer: creatorType.is_writer,
                is_audio: creatorType.is_audio,
                is_artist: creatorType.is_artist,
                is_video: creatorType.is_video,
                payment_info: null
            }
            const configObj ={
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(creatorData)
            }
            fetch(`/api/creators/${editCreator.id}`, configObj)
            .then(r => r.json())
            .catch(error => console.log(error))
            .then(data => {
                console.log(data)
                dispatch(updateCreators(data))
                navigate("/creatorprofiles")
            })
        } else{
            alert("You must enter a name.")
        }
    }

    function deleteCreator(){
        fetch(`/api/creators/${editCreator.id}`, {method: "DELETE"})
        .then(()=>{
            dispatch(removeCreator(editCreator))
            navigate("/creatorprofiles")
        })
    }

    if (editCreator === null){
        return <h1>Loading... </h1>
    }

    return (
        <Container>
            <Modal show={showDeleteModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Remove Creator Profile?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Removing this creator profile will permanently delete all posts made this creator.</p>
                    <Button variant="success" onClick={deleteCreator}>Remove Profile</Button>
                    <Button variant="success" onClick={()=>setShowDeleteModal(false)}>Cancel</Button>
                </Modal.Body>
            </Modal>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <h1>Edit {editCreator.name}</h1>
                </Col>
                <Col>
                    {loading ? <p>Loading Profile pic...</p> : null}
                    {thumbnailDisplay === null ? null : <Image src={thumbnailDisplay} style={{"height": "100px"}}/>}
                    {thumbnailDisplay === null ? null : <Button variant="success" onClick={() => setThumbnailDisplay(null)}>Remove Photo</Button>}
                </Col>
                <Col>
                    <Button variant="success" onClick={() => setShowDeleteModal(true)}>Delete Creator Profile</Button>
                </Col>
            </Row>
           <Row>
                {thumbnailDisplay === null ? <Form onSubmit={submitPic} >
                    <Form.Group>
                        <Form.Label>Upload your Creator profile picture <em>(Optional)</em></Form.Label>
                        <Form.Control type="file" name="file" ref={ref} onChange={picChangeHandler}/>
                        <Button variant="success" type="submit">Add Prof Pic</Button>
                    </Form.Group>
                </Form> : null}
            </Row>
            <Form onChange={nameChange}>
                <Form.Group>
                    <Form.Label>Creator Name:</Form.Label>
                    <Form.Control type="text" name="name" value={creatorName}/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group>
                    <Form.Label>How would you describe yourself? Select all that apply.</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Writer</Form.Label>
                    <Form.Check type="switch" checked={creatorType.is_writer} onChange={() => setCreatorType({...creatorType, is_writer: !creatorType.is_writer})}/>
                    <Form.Label>Musician / Audio Producer</Form.Label>
                    <Form.Check type="switch" checked={creatorType.is_audio} onChange={() => setCreatorType({...creatorType, is_audio: !creatorType.is_audio})}/>
                    <Form.Label>Visual Artist / Photographer</Form.Label>
                    <Form.Check type="switch" checked={creatorType.is_artist} onChange={() => setCreatorType({...creatorType, is_artist: !creatorType.is_artist})}/>
                    <Form.Label>Video / Film Maker </Form.Label>
                    <Form.Check type="switch" checked={creatorType.is_video} onChange={() => setCreatorType({...creatorType, is_video: !creatorType.is_video})}/>
                </Form.Group>
            </Form>
            <Button variant="success" onClick={submitCreator}>Save</Button>
        </Container>
    )
}

export default EditCreatorProfile
