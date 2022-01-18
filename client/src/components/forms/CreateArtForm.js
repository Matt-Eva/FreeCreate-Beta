import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import {useState, useRef} from "react"
import {useNavigate, Link} from "react-router-dom"

function CreateArtForm({contentType, creator}) {
    const [creationThumbnail, setCreatorThumbnail] = useState(null)
    const [thumbnailDisplay, setThumbnailDisplay] = useState(null)
    const [artFile, setArtFile] = useState(null)
    const [artUrl, setArtUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [artLoading, setArtLoading] = useState(false)
    const [artDisplay, setArtDisplay] = useState(null)
    const thumbRef = useRef()
    const artRef = useRef()

    function picChangeHandler(e){
        const thumbnail = e.target.files[0]
        if (thumbnail.name.endsWith(".jpg") || thumbnail.name.endsWith(".jpeg") ){
            setCreatorThumbnail(thumbnail)
        } else if (thumbnail.name.endsWith(".png")){
            setCreatorThumbnail(thumbnail)
        } else{
            alert("That is not an appropriate image file.")
            thumbRef.current.value=""
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
                    thumbRef.current.value=""
                }
            })     
        } else {
            alert("please select an image")
            setLoading(false)
        }
    }

    function artChangeHandler(e){
        const file = e.target.files[0]
        if (file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") ){
            setArtFile(file)
        } else if (file.name.endsWith(".png")){
            setArtFile(file)
        } else{
            alert("That is not an appropriate image file.")
            artRef.current.value=""
            console.log(e.target.value)
        } 
    }

    function uploadArt(e){
        e.preventDefault()
        setArtLoading(true)
        if (artFile instanceof File){
            const cloudinaryUrl = "https://api.cloudinary.com/v1_1/freecreate/image/upload"
            const fd = new FormData()
            fd.append('file', artFile)
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
                        setArtDisplay(data.secure_url)
                        setArtLoading(false)
                    })
                } else{
                    setArtLoading(false)
                    alert("You did not select a valid image file")
                    artRef.current.value=""
                }
            })
        } else {
            alert("please select an image")
            setLoading(false)
        }
    }

    function createArt(){

    }

    return (
        <Container>
            <h4>Add {contentType}:</h4>
            <Row>
                <Col>
                    <h4>Select creation thumbnail:</h4>
                    {thumbnailDisplay ?  null : <Form onSubmit={submitPic}>
                        <Form.Group>
                            <Form.Label>Upload Thumbnail:</Form.Label>
                            <Form.Control type="file" name="file" ref={thumbRef} onChange={picChangeHandler}/>
                        </Form.Group>
                        <Button type="submit">Add Thumbnail</Button>
                    </Form> }
                </Col>
                <Col>
                    {loading ? <p>Loading thumbnail...</p> : null}
                    {thumbnailDisplay ? <Image src={thumbnailDisplay} style={{"height": "100px"}}/> : <h4><em>Your Thumbnail Here</em></h4>}
                </Col>
            </Row>
            <Row>
                {artLoading ? <p>Loading image...</p> : null}
                {artDisplay ? <Image src={artDisplay} style={{"height": "300px", "width": "300px"}}/> : <Form onSubmit={uploadArt}>
                    <Form.Group>
                        <Form.Label>Content:</Form.Label>
                        <Form.Control type="file" ref={artRef} onChange={artChangeHandler}/>
                        <Button type="submit">Upload Image</Button>
                    </Form.Group>
                </Form>}
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

export default CreateArtForm