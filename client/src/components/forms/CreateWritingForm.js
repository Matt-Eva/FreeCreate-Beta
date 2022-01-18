import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import {useState, useRef} from "react"
import {useNavigate, Link} from "react-router-dom"

function CreateWritingForm({creator}) {
    const [uploadData, setUploadData] = useState({
        title: "",
        thumbnail: "",
        content: "",
        category: ""
    })
    const ref = useRef()
    const [creationThumbnail, setCreationThumbnail] = useState(null)
    const [thumbnailDisplay, setThumbnailDisplay] = useState(null)
    const [creationId, setCreationId] = useState(0)
    const [tag, setTag] = useState("")
    const [taglinks, setTaglinks] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // console.log(creator)
    // console.log(uploadData)
    // console.log(thumbnailDisplay)

    const displayTaglinks = taglinks?.map(taglink => <span key={taglink}> {taglink} </span>)


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

    function handleFormChange(e){
        setUploadData({
            ...uploadData,
            [e.target.name]: e.target.value
        })
    }

    function createWriting(e){
        e.preventDefault()
        const newWrit = {
            title: uploadData.title,
            content: uploadData.content,
            thumbnail: thumbnailDisplay,
            category: uploadData.category,
            length: uploadData.content.length,
            creator_id: creator.id
        }
        const configObj ={
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newWrit)
        }
        console.log(newWrit)
        fetch(`/api/writings`, configObj)
        .then(r =>{
            if(r.ok){
                r.json().then(data =>{
                    setCreationId(data.id)
                    console.log(data)
                    // navigate("/")
                })
            } else{
                console.log(r)
            }
        })
    }

    function submitTag(e){
        e.preventDefault()
        for (const taglink of taglinks){
            if (taglink === tag) {
                setTag("")
                return alert("you have already added that tag")
            }
        }
        const newTag = {
            tag: tag,
            writing_id: creationId
        }
        const configObj = {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(newTag)
        }
        fetch("/api/writ_taglinks", configObj)
        .then(r =>{
            if (r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setTaglinks([...taglinks, data.tag.tag])
                    setTag("")
                })
            } else {
                r.json().then(data=>{
                    console.log(data)
                })
            }
        })
    }

    return (
        <Container style={{"marginBottom": "50px"}}>
            <h4>Add writing:</h4>
            <Row>
                <Col>
                    <h4>Select creation thumbnail:</h4>
                    {thumbnailDisplay ?  null : <Form onSubmit={submitPic}>
                        <Form.Group>
                            <Form.Label>Upload Image:</Form.Label>
                            <Form.Control type="file" name="file" ref={ref} onChange={picChangeHandler}/>
                        </Form.Group>
                        <Button type="submit">Add Thumbnail</Button>
                    </Form> }
                </Col>
                <Col>
                    {loading ? <p>Loading thumbnail...</p> : null}
                    {thumbnailDisplay ? <Image src={thumbnailDisplay} style={{"height": "100px"}}/> : <h4><em>Your Thumbnail Here</em></h4>}
                </Col>
            </Row>
            <Form onChange={handleFormChange} onSubmit={createWriting}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    {creationId === 0 ? <Form.Control type="text" name="title" value={uploadData.title}/> : <Form.Control type="text" name="title" value={uploadData.title} disabled/>  }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content:</Form.Label>
                    {creationId === 0 ? <Form.Control as="textarea" name="content" value={uploadData.content}/> :
                     <Form.Control as="textarea" name="content" value={uploadData.content} disabled/> } 
                </Form.Group>
                {(uploadData.title === "" || uploadData.content === "") || (thumbnailDisplay === null || creationId !== 0) ? <Button type="submit" disabled>Create</Button> : <Button type="submit">Create</Button>}
            </Form>
            <Form onChange={(e) => setTag(e.target.value.toLowerCase())} onSubmit={submitTag}>
                <Form.Label>Add Tags:</Form.Label>
                <Form.Control type="text" value={tag}/>
                {creationId === 0 ? <Button type="submit" disabled>Add Tag</Button> : <Button type="submit">Add Tag</Button> }
            </Form>
            <p>
                {displayTaglinks}
            </p>
            {creationId !== 0 ? <Link to="/"><Button>Finish</Button></Link> : <Link to="/"><Button>Cancel</Button></Link>}
        </Container>
    )
}

export default CreateWritingForm
