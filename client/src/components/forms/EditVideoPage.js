import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react"
import TopNav from "../navigation/TopNav"

function EditVideo() {
    const video = useSelector(state => state.editCreations.editVideo)
    const [showDelete, setShowDelete] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    })
    const navigate = useNavigate()

    useEffect(() =>{
        if (video === null){
            navigate('/mycreations')
        } else{
            setFormData({
                title: video.title,
                content: video.content
            })
        }
    }, [])

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function updateVideo(e){
        e.preventDefault()
        const updVid = {
            title: formData.title,
            content: formData.content
        }
        const configObj = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updVid)
        }
        fetch(`/api/videos/${video.id}`, configObj)
        .then(r =>{
            if(r.ok){
                r.json().then(data => {
                    console.log(data)
                    navigate("/mycreations")
                })
            }else{
                r.json().then(data =>{
                    console.log(data)
                })
            }
        })

    }

    function deleteVideo(){
        fetch(`/api/videos/${video.id}`, {method: "DELETE"})
        .then(() =>{
            console.log("delete successful")
            navigate("/mycreations")
        })
    }

    if (video === null){
        return <h1>Loading... </h1>
    }

    return (
        <Container>
            <Modal show={showDelete} backdrop="static" onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {video.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete {video.title}? Deleting {video.title} will permanently remove it from FreeCreate.</p>
                    <Button variant="success" onClick={() => setShowDelete(false)}>Cancel</Button>
                    <Button variant="success" onClick={deleteVideo}>Delete</Button>
                </Modal.Body>
            </Modal>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <h1>Edit {video.title}</h1>
                </Col>
                <Col>
                    <Image src={video.thumbnail} style={{"width": "300px"}}/>
                </Col> 
                <Col>
                    <Button variant="success" onClick={() => setShowDelete(true)}>Delete</Button>
                </Col>
            </Row>
            <Row>
           <video controls style={{"width": "500px"}}><source src={video.content} type="video/mp4"/></video>
            </Row>
            <Row>
                <Form onChange={handleChange} onSubmit={updateVideo}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title}/>
                    </Form.Group>
                    <Button type="submit" variant="success">Save Changes</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default EditVideo
