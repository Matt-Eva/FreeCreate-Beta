import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/Image"
import {useState} from "react"

function CreateMediaForm({contentType, creator}) {

    const [thumbnail, setThumbnail] = useState(null)

    return (
        <Container>
            <h4>Add {contentType}:</h4>
            <Row>
                <Col>
                    <h4>Select creation thumbnail:</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label>Upload Image:</Form.Label>
                            <Form.Control type="file"/>
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    {thumbnail ? <Image src={thumbnail}/> : <h2><em>Your Thumbnail Here</em></h2>}
                </Col>
            </Row>
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                </Form>
            </Row>
            
        </Container>
    )
}

export default CreateMediaForm