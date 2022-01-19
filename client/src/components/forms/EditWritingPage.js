import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button"
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react"
import TopNav from "../navigation/TopNav"

function EditWritingPage() {
    const writing = useSelector(state => state.editCreations.editWriting)
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    })
    const navigate = useNavigate()

    useEffect(() =>{
        if (writing === null){
            navigate('/mycreations')
        } else{
            setFormData({
                title: writing.title,
                content: writing.content
            })
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

    if (writing === null){
        return <h1>Loading... </h1>
    }

    return (
        <Container>
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
            </Row>
        </Container>
    )
}

export default EditWritingPage
