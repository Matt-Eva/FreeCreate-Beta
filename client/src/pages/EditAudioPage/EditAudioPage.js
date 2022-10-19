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

function EditAudio() {
    const audio = useSelector(state => state.editCreations.editAudio)
    const [showDelete, setShowDelete] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    })
    const [tag, setTag] = useState("")
    const [taglinks, setTaglinks] = useState([])
    
    const navigate = useNavigate()

    const displayTaglinks = taglinks?.map(taglink => <span key={taglink.id} onClick={() => deleteTagLink(taglink.id)} title="click to delete" style={{"cursor": "pointer"}}> | {taglink.tag_text} | </span>)

    function deleteTagLink(id){
        fetch(`/api/aud_taglinks/${id}`, {method: "DELETE"})
        .then(() =>{
            const oneLess = taglinks.filter(taglink => taglink.id !== id)
            setTaglinks([...oneLess])
        })
    }

    useEffect(() =>{
        if (audio === null){
            navigate('/mycreations')
        } else{
            setFormData({
                title: audio.title,
                content: audio.content
            })
            setTaglinks(audio.aud_taglinks)
        }
    }, [])

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function updateAudio(e){
        e.preventDefault()
        const updAud = {
            title: formData.title
        }
        const configObj = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updAud)
        }
        fetch(`/api/audios/${audio.id}`, configObj)
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

    function deleteAudio(){
        fetch(`/api/audios/${audio.id}`, {method: "DELETE"})
        .then(() =>{
            console.log("delete successful")
            navigate("/mycreations")
        })
    }

    function submitTag(e){
        e.preventDefault()
        for (const taglink of taglinks){
            if (taglink.tag_text === tag) {
                setTag("")
                console.log("no new")
                return alert("you have already added that tag")
            }
        }
        const newTag = {
            tag: tag,
            audio_id: audio.id
        }
        const configObj = {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(newTag)
        }
        fetch("/api/aud_taglinks", configObj)
        .then(r =>{
            if (r.ok){
                r.json().then(data =>{
                    setTaglinks([...taglinks, data])
                    setTag("")
                })
            } else {
                r.json().then(data=>{
                    console.log(data)
                })
            }
        })
    }

    if (audio === null){
        return <h1>Loading... </h1>
    }

    return (
        <Container>
            <Modal show={showDelete} backdrop="static" onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete "{audio.title}"?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete "{audio.title}"? Deleting "{audio.title}" will permanently remove it from FreeCreate.</p>
                    <Button variant="success" onClick={() => setShowDelete(false)}>Cancel</Button>
                    <Button variant="success" onClick={deleteAudio}>Delete</Button>
                </Modal.Body>
            </Modal>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <h1>Edit {audio.title}</h1>
                </Col>
                <Col>
                    <Image src={audio.thumbnail} style={{"width": "300px"}}/>
                </Col> 
                <Col>
                    <Button variant="success" onClick={() => setShowDelete(true)}>Delete</Button>
                </Col>
            </Row>
            <Row>
           <audio controls src={audio.content}>You're browser does not support this audio player</audio>
            </Row>
            <Row>
                <Form onChange={handleChange} onSubmit={updateAudio}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title}/>
                    </Form.Group>
                    <Button type="submit" variant="success">Save Changes</Button>
                </Form>
                <Form onChange={(e) => setTag(e.target.value.toLowerCase())} onSubmit={submitTag}>
                    <Form.Label>Add Tags:</Form.Label>
                    <Form.Control type="text" value={tag}/>
                    <Button variant="success" type="submit">Add Tag</Button> 
                </Form>
                    <p>
                        {displayTaglinks}
                    </p>
            </Row>
        </Container>
    )
}

export default EditAudio
