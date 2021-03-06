import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import {useState, useRef} from "react"
import {useNavigate, Link} from "react-router-dom"

function CreateVideoForm({contentType, creator}) {
    const [creationThumbnail, setCreationThumbnail] = useState(null)
    const [thumbnailDisplay, setThumbnailDisplay] = useState(null)
    const [videoFile, setVideoFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [videoLoading, setVideoLoading] = useState(false)
    const [videoDisplay, setVideoDisplay] = useState(null)
    const [title, setTitle] = useState("")
    const thumbRef = useRef()
    const videoRef = useRef()
    const [creationId, setCreationId] = useState(0)
    const [tag, setTag] = useState("")
    const [taglinks, setTaglinks] = useState([])
    const [deletingThumbnail, setDeletingThumbnail] = useState(null)
    const [deletingVideo, setDeletingVideo] = useState(null)
    const [publicThumbnailId, setPublicThumbnailId] = useState(null)
    const [publicVideoId, setPublicVideoId] = useState(null)

    const displayTaglinks = taglinks?.map(taglink => <span key={taglink}> {taglink.tag_text} </span>)

    function picChangeHandler(e){
        const thumbnail = e.target.files[0]
        if (thumbnail.name.endsWith(".jpg") || thumbnail.name.endsWith(".jpeg") ){
            setCreationThumbnail(thumbnail)
        } else if (thumbnail.name.endsWith(".png")){
            setCreationThumbnail(thumbnail)
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
                        setPublicThumbnailId(data.public_id)
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

    function deleteThumbnail(){
        const idObj = {
            public_id: publicThumbnailId
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(idObj)
        }
        setDeletingThumbnail(true)
        fetch('/cloudinary/thumbnail/destroy', configObj)
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            setDeletingThumbnail(false)
            setThumbnailDisplay(null)
        })
    }

    function videoChangeHandler(e){
        const file = e.target.files[0]
        if (file.name.endsWith(".mp4")){
            setVideoFile(file)
        } else{
            alert("That is not an appropriate image file.")
            videoRef.current.value=""
            console.log(e.target.value)
        } 
    }

    function uploadVideo(e){
        e.preventDefault()
        setVideoLoading(true)
        if (videoFile instanceof File){
            const cloudinaryUrl = "https://api.cloudinary.com/v1_1/freecreate/video/upload"
            const fd = new FormData()
            fd.append('file', videoFile)
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
                        setVideoDisplay(data.secure_url)
                        setPublicVideoId(data.public_id)
                        setVideoLoading(false)
                    })
                } else{
                    setVideoLoading(false)
                    alert("You did not select a valid image file")
                    videoRef.current.value=""
                }
            })
        } else {
            alert("please select an image")
            setVideoLoading(false)
        }
    }

    function deleteVideo(){
        const idObj={
            public_id: publicVideoId
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(idObj)
        }
        setDeletingVideo(true)
        fetch("/cloudinary/video/destroy", configObj)
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            setDeletingVideo(false)
            setVideoDisplay(null)
        })
    }

    function createVideo(e){
        e.preventDefault()
        const newVideo = {
            title: title,
            content: videoDisplay,
            thumbnail: thumbnailDisplay,
            creator_id: creator.id,
            rank: 0
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newVideo)
        }

        fetch("/api/videos", configObj)
        .then(r => {
            if (r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setCreationId(data.id)
                })
            } else{
                r.json().then(data => console.log(data))
            }
        })
    }

    function submitTag(e){
        e.preventDefault()
        for (const taglink of taglinks){
            if (taglink.tag_text === tag) {
                setTag("")
                console.log("no new")
                return alert("you have already added that tag")
            }
        }
        const newTag = {
            tag: tag,
            video_id: creationId
        }
        const configObj = {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(newTag)
        }
        fetch("/api/vid_taglinks", configObj)
        .then(r =>{
            if (r.ok){
                r.json().then(data =>{
                    setTaglinks([...taglinks, data])
                    setTag("")
                })
            } else {
                r.json().then(data=>{
                    // console.log(data)
                })
            }
        })
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
                        <Button variant="success" type="submit">Add Thumbnail</Button>
                    </Form> }
                </Col>
                <Col>
                    {loading ? <p>Loading thumbnail...</p> : null}
                    {deletingThumbnail ? <p>Removing thumbnail...</p>: null}
                    {thumbnailDisplay ? <Image src={thumbnailDisplay} style={{"height": "200px"}} className="rounded mb-2"/> : <h4><em>Your Thumbnail Here</em></h4>}
                    <br />
                    {thumbnailDisplay && creationId === 0 ? <Button variant="success" onClick={deleteThumbnail}>Remove Thumbnail</Button> : null}
                </Col>
            </Row>
            <Row>
                {videoLoading ? <p>Loading video...</p> : null}
                {deletingVideo ? <p>Removing video...</p> : null}
                {videoDisplay ? <video controls style={{"width": "500px", "maxHeight": "600px"}} className="mb-2 mt-2"><source src={videoDisplay} type="video/mp4"/></video> : <Form onSubmit={uploadVideo}>
                    <Form.Group>
                        <Form.Label>Video:</Form.Label>
                        <Form.Control type="file" ref={videoRef} onChange={videoChangeHandler} className="mb-2"/>
                        <Button variant="success" type="submit">Upload Video</Button>
                    </Form.Group>
                </Form>}
                {videoDisplay && creationId === 0 ? <div><Button variant="success" onClick={deleteVideo}>Remove Video</Button></div>: null}
            </Row>
            <Row>
                <Form onChange={(e) => setTitle(e.target.value)} onSubmit={createVideo}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        {creationId === 0 ? <Form.Control type="text" value={title}/> : <Form.Control disabled type="text" value={title}/> }
                    </Form.Group>
                    {(title === "" || creationId !== 0) || (videoDisplay === null || thumbnailDisplay === null) ? <Button variant="success" type="submit" disabled>Create</Button> : <Button variant="success" type="submit">Create</Button>}
                </Form>
            </Row>
            <Form onChange={(e) => setTag(e.target.value.toLowerCase())} onSubmit={submitTag}>
                <Form.Label>Add Tags:</Form.Label>
                <Form.Control type="text" value={tag}/>
                {creationId === 0 ? <Button variant="success" type="submit" disabled>Add Tag</Button> : <Button variant="success" type="submit">Add Tag</Button> }
            </Form>
            <p>
                {displayTaglinks}
            </p>
            {creationId !== 0 ? <Link to="/"><Button variant="success">Finish</Button></Link> : <Link to="/"><Button variant="success">Cancel</Button></Link>}
            
        </Container>
    )
}

export default CreateVideoForm