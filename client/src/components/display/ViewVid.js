import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'

function ViewVid() {
    const [video, setVideo] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        fetch(`/api/videos/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setVideo(data)
                })
            }
        })
    }, [])

    function like(){

    }

    function listAdd(){

    }

    function libAdd(){
        
    }

    if (video === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row className="justify-content-center text-center">
                <h1>{video.title}</h1>
                <video controls style={{"width": "800px"}}><source src={video.content} type="video/mp4" /></video>
            </Row>
            <Row>
                <Col>
                    <Button variant="success">Like</Button>
                    <Button variant="success">Add to Library</Button>
                    <Button variant="success">Add to Reading List</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewVid
