import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'

function ViewAud() {
    const [audio, setAudio] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        fetch(`/api/audios/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setAudio(data)
                })
            }
        })
    }, [])

    if (audio === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Image src={audio.thumbnail} style={{"width": "300px"}}/>
            </Row>
            <Row className="justify-content-center text-center">
                <h1>{audio.title}</h1>
                <audio controls src={audio.content} style={{"width": "800px"}}>Your browser does not support this audio player</audio>
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

export default ViewAud
