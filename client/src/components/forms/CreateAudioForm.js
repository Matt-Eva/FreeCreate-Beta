import Form from 'react-bootstrap/Form'

function CreateAudioForm() {
    return (
        <Form>
        <Form.Group>
            <Form.Label>AudioTitle:</Form.Label>
            <Form.Control type="text"/>
        </Form.Group>
    </Form>
    )
}

export default CreateAudioForm
