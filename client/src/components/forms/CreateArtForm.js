import Form from 'react-bootstrap/Form'

function CreateArtForm() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Art Title:</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
        </Form>
    )
}

export default CreateArtForm