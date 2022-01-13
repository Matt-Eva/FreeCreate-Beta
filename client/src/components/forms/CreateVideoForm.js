import Form from 'react-bootstrap/Form'

function CreateVideoForm() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Video Title:</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
        </Form>
    )
}

export default CreateVideoForm
