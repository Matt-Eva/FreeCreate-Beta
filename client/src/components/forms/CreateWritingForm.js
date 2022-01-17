import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/Image"
import {useState, useRef} from "react"

function CreateWritingForm() {
    const [uploadData, setUploadData] = useState({
        title: "",
        thumbnail: "",
        content: "",
        category: ""
    })
    const ref = useRef()

    const [creationThumbnail, setCreationThumbnail] = useState(null)
    const [thumbnailDisplay, setThumbnailDisplay] = useState(null)
    const [loading, setLoading] = useState(false)

    function picChangeHandler(e){
        const thumbnail = e.target.files[0]
        if (thumbnail.name.endsWith(".jpg") || thumbnail.name.endsWith(".jpeg") ){
            setCreationThumbnail(thumbnail)
        } else if (thumbnail.name.endsWith(".png")){
            setCreationThumbnail(thumbnail)
        } else{
            alert("That is not an appropriate image file.")
            ref.current.value=""
            console.log(e.target.value)
        } 
    }

    function submitPic(e){
        e.preventDefault()
        setLoading(true)
        if (creationThumbnail instanceof File){
            const cloudinaryUrl = "https://api.cloudinary.com/v1_1/freecreate/image/upload"
            const fd = new FormData()
            fd.append('file', creationThumbnail)
            fd.append('upload_preset', 'you-create')
            const configObj = {
                method: "POST",
                body: fd
            }
            fetch(cloudinaryUrl, configObj)
            .then(r => {
                console.log(r)
                if (r.ok){
                    r.json()
                    .catch(error => console.log(error))
                    .then(data =>{
                        setThumbnailDisplay(data.secure_url)
                        setLoading(false)
                    })
                } else{
                    setLoading(false)
                    alert("You did not select a valid image file")
                    ref.current.value=""
                }
            })     
        } else {
            alert("please select an image")
            setLoading(false)
        }
    }

    return (
        <Container>
            <h4>Add writing:</h4>
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
                    {thumbnailDisplay ? <Image src={thumbnailDisplay}/> : <h4><em>Your Thumbnail Here</em></h4>}
                </Col>
            </Row>
            <Form>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content:</Form.Label>
                    <Form.Control as="textarea" />
                </Form.Group>
            </Form>
        </Container>
    )
}

export default CreateWritingForm
