import Form from 'react-bootstrap/Form'
import useState from 'react'

function CreateWritingForm() {
    const [uploadData, setUploadData] = useState({
        title: "",
        thumbnail: "",
        content: "",
        category: ""
    })
    return (
        <>
        <h4>Add Writing:</h4>
        <Form>
            <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
        </Form>
        </>
    )
}

export default CreateWritingForm
