import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'

function ViewVid() {
    const [writing, setWriting] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        fetch(`/api/writings/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setWriting(data)
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

    if (writing === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <Button variant="success" onClick={like}>Like</Button>
                    <Button variant="success" onClick={libAdd}>Add to Library</Button>
                    <Button variant="success" onClick={listAdd}>Add to Reading List</Button>
                </Col>
            </Row>
            <Row className="justify-content-center text-center">
                <h1>{writing.title}</h1>
                <p>{writing.content}</p>
            </Row>
        </Container>
    )
}

export default ViewVid
