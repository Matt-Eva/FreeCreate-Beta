import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'

function ViewArt() {
    const [art, setArt] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        fetch(`/api/arts/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setArt(data)
                })
            }
        })
    }, [])

    if (art === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row className="justify-content-center text-center">
                <h1>{art.title}</h1>
                <Image src={art.content} style={{"width": "800px"}}/>
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

export default ViewArt
