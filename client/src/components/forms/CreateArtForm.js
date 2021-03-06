import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import {useState, useRef} from "react"
import {useNavigate, Link} from "react-router-dom"

function CreateArtForm({contentType, creator}) {
    const [creationThumbnail, setCreationThumbnail] = useState(null)
    const [thumbnailDisplay, setThumbnailDisplay] = useState(null)
    const [artFile, setArtFile] = useState(null)
    const [artUrl, setArtUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [artLoading, setArtLoading] = useState(false)
    const [artDisplay, setArtDisplay] = useState(null)
    const [title, setTitle] = useState("")
    const thumbRef = useRef()
    const artRef = useRef()
    const [creationId, setCreationId] = useState(0)
    const [tag, setTag] = useState("")
    const [taglinks, setTaglinks] = useState([])
    const [deletingThumbnail, setDeletingThumbnail] = useState(null)
    const [deletingArt, setDeletingArt] = useState(false)
    const [publicThumbnailId, setPublicThumbnailId] = useState(null)
    const [publicArtId, setPublicArtId] = useState(null)

    console.log(taglinks)
    const displayTaglinks = taglinks?.map(taglink => <span key={taglink.id}> {taglink.tag_text} </span>)

    // function deleteTagLink(id){
    //     fetch(`/api/art_taglinks/${id}`, {method: "DELETE"})
    //     .then(() =>{
    //         const oneLess = taglinks.filter(taglink => taglink.id !== id)
    //         setTaglinks(...oneLess)
    //     })
    // }

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
        const idObj ={
            public_id: publicThumbnailId
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(idObj)
        }
        setDeletingThumbnail(true)
        fetch("/cloudinary/thumbnail/destroy", configObj)
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            setDeletingThumbnail(false)
            setThumbnailDisplay(null)
        })
    }

    function artChangeHandler(e){
        console.log(e.target.value)
        const file = e.target.files[0]
        setArtFile(file)
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
                        setPublicArtId(data.public_id)
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
            setArtLoading(false)
        }
    }

    function deleteArt(){
        const idObj = {
            public_id: publicArtId
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(idObj)
        }
        setDeletingArt(true)
        fetch("/cloudinary/art/destroy", configObj)
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            setDeletingArt(false)
            setArtDisplay(null)
        })
    }

    function createArt(e){
        e.preventDefault()
        const newArt = {
            title: title,
            content: artDisplay,
            thumbnail: thumbnailDisplay,
            creator_id: creator.id,
            rank: 0
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newArt)
        }

        fetch("/api/arts", configObj)
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
            if (taglink === tag) {
                setTag("")
                console.log("no new")
                return alert("you have already added that tag")
            }
        }
        const newTag = {
            tag: tag,
            art_id: creationId
        }
        const configObj = {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(newTag)
        }
        fetch("/api/art_taglinks", configObj)
        .then(r =>{
            if (r.ok){
                r.json().then(data =>{
                    console.log(data)
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
                    {deletingThumbnail ? <p>Removing thumbnail...</p> : null}
                    {thumbnailDisplay ? <Image src={thumbnailDisplay} style={{"height": "200px"}} className="rounded mb-2"/> : <h4><em>Your Thumbnail Here</em></h4>}
                    <br/>
                    {thumbnailDisplay && creationId === 0 ? <Button variant="success" onClick={deleteThumbnail}>Remove Thumbnail</Button> : null}
                </Col>
            </Row>
            <Row>
                {artLoading ? <p>Loading image...</p> : null}
                {deletingArt ? <p>Deleting art...</p> : null}
                {artDisplay ? <Image src={artDisplay} style={{"height": "300px", "width": "300px"}}/> : <Form onSubmit={uploadArt}>
                    <Form.Group>
                        <Form.Label>Content:</Form.Label>
                        <Form.Control type="file" ref={artRef} onChange={artChangeHandler}/>
                        <Button variant="success" type="submit">Upload Image</Button>
                    </Form.Group>
                </Form>}
                {artDisplay && creationId === 0 ? <div><Button variant="success" onClick={deleteArt}>Remove Art</Button></div> : null}
                
            </Row>
            <Row>
                <Form onChange={(e) => setTitle(e.target.value)} onSubmit={createArt}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        {creationId === 0 ? <Form.Control type="text" value={title}/> : <Form.Control disabled type="text" value={title}/> }
                    </Form.Group>
                    {(title === "" || creationId !== 0) || (artDisplay === null || thumbnailDisplay === null) ? <Button variant="success" type="submit" disabled>Create</Button> : <Button variant="success" type="submit">Create</Button>}
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

export default CreateArtForm