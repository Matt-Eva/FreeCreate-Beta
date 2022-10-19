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
import TopNav from "../../components/TopNav/TopNav"

function EditWritingPage() {
    const writing = useSelector(state => state.editCreations.editWriting)
    const [showDelete, setShowDelete] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    })
    const [tag, setTag] = useState("")
    const [taglinks, setTaglinks] = useState([])
    // console.log(writing)
    // console.log(taglinks)

    const navigate = useNavigate()

    const displayTaglinks = taglinks?.map(taglink => <span key={taglink.id} onClick={() => deleteTagLink(taglink.id)} title="click to delete" style={{"cursor": "pointer"}}> {taglink.tag_text} </span>)

    function deleteTagLink(id){
        fetch(`/api/writ_taglinks/${id}`, {method: "DELETE"})
        .then(() =>{
            const oneLess = taglinks.filter(taglink => taglink.id !== id)
            setTaglinks([...oneLess])
        })
    }

    useEffect(() =>{
        if (writing === null){
            navigate('/mycreations')
        } else{
            setFormData({
                title: writing.title,
                content: writing.content
            })
            setTaglinks(writing.writ_taglinks)
        }
    }, [])

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function updateWriting(e){
        e.preventDefault()
        const updWrit = {
            title: formData.title,
            content: formData.content
        }
        const configObj = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updWrit)
        }
        fetch(`/api/writings/${writing.id}`, configObj)
        .then(r =>{
            if(r.ok){
                r.json().then(data => {
                    console.log(data)
                    navigate("/mycreations")
                })
            }else{
                r.json.then(data =>{
                    console.log(data)
                })
            }
        })

    }

    function deleteWriting(){
        fetch(`/api/writings/${writing.id}`, {method: "DELETE"})
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
            writing_id: writing.id
        }
        const configObj = {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(newTag)
        }
        fetch("/api/writ_taglinks", configObj)
        .then(r =>{
            if (r.ok){
                r.json().then(data =>{
                    console.log(data)
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

    if (writing === null){
        return <h1>Loading... </h1>
    }

    return (
        <Container>
            <Modal show={showDelete} backdrop="static" onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {writing.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete {writing.title}? Deleting {writing.title} will permanently remove it from FreeCreate.</p>
                    <Button variant="success" onClick={() => setShowDelete(false)}>Cancel</Button>
                    <Button variant="success" onClick={deleteWriting}>Delete</Button>
                </Modal.Body>
            </Modal>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <h1>Edit {writing.title}</h1>
                </Col>
                <Col>
                    <Image src={writing.thumbnail} style={{"width": "300px"}}/>
                </Col> 
                <Col>
                    <Button variant="success" onClick={() => setShowDelete(true)}>Delete</Button>
                </Col>
            </Row>
            <Row>
                <Form onChange={handleChange} onSubmit={updateWriting}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content:</Form.Label>
                        <Form.Control as="textarea" name="content" value={formData.content}/>
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

export default EditWritingPage
