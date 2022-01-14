import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import CreateArtForm from "./CreateArtForm"
import CreateWritingForm from "./CreateWritingForm"
import CreateAudioForm from "./CreateAudioForm"
import CreateVideoForm from "./CreateVideoForm"
import TopNav from "../navigation/TopNav"

function CreateCreationPage() {
    const user = useSelector(state => state.user.user)
    const [contentType, setContentType] = useState("")
    const [creatorId, setCreatorId] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    // console.log(contentType)
    // console.log(creatorId)

    let creatorOptions = []
    let displayCreator = undefined; 
    if (user !== null){
        creatorOptions = user.creators?.map(option => <option key={option.id} value={option.id}>{option.name}</option>)
        // console.log(user.creators[0].id)
        // user.creators.forEach(option => console.log(option.id))
        if (creatorId !== null && user.creators.length !== 0){
            console.log(creatorId)
            console.log(user.creators[0].id)
            displayCreator = user.creators.filter(option => option.id === creatorId)[0]
        }
    }
    console.log(displayCreator)
    
    if (creatorOptions.length === 0){
        return(
            <Container>
                <Row>
                    <TopNav />
                </Row>
                <Row>
                <div>
                    <h2>You haven't set up any creator profiles.</h2>
                    <p>You will need to create a creator profile before posting your creations.</p>
                    <Link to="/newcreator"><Button>Create a Creator Profile</Button></Link>
                </div>
                </Row>
            </Container>
        )
    }

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <h1>Create!</h1>
                    <select onChange={(e) => setCreatorId(parseInt(e.target.value))}>
                        <option value={"0"} >Select Creator Profile</option>
                        {creatorOptions}
                    </select>
                </Col>
                <Col>
                {displayCreator !== undefined ? <div>
                    <Image src={displayCreator.prof_pic} style={{"height": "100px"}}/>
                    {displayCreator.prof_pic ? null : <p><em>(No profile picture associated with this creator)</em></p>}
                    <h4>{displayCreator.name}</h4>
                </div> : null}
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* {creator ? <h2>{creator.name}</h2> : <h2>Please choose a creator Profile</h2>} */}
                    <select onChange={(e) => setContentType(e.target.value)}>
                        <option value="">Select Creation Type</option>
                        <option value="writing">Writing</option>
                        <option value="audio">Audio</option>
                        <option value="art">Art(Images)</option>
                        <option value="video">Video</option>
                    </select>
                </Col>
                <Col>
                    {thumbnail ? <Image src={thumbnail}/> : <h2><em>Your Thumbnail Here</em></h2>}
                </Col>
            </Row>
            <Row>
                {contentType === "writing" ? <CreateWritingForm/>: null}
                {contentType === "audio" ? <CreateAudioForm/>: null}
                {contentType === "art" ? <CreateArtForm/>: null}
                {contentType === "video" ? <CreateVideoForm/>: null}
            </Row>
            
        </Container>
    )
}

export default CreateCreationPage