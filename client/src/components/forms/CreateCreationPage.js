import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
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
    const creators = useSelector(state => state.creators.creators)
    const [contentType, setContentType] = useState("")
    const [creatorId, setCreatorId] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    
    let creatorOptions = creators?.map(option => <option key={option.id} value={option.id}>{option.name}</option>)
    let displayCreator = undefined;
    displayCreator = creators.filter(option => option.id === creatorId)[0] 

    if (creators.length === 0){
        return(
            <Container>
                <Row>
                    <TopNav />
                </Row>
                <Row>
                <div>
                    <h2>You haven't set up any creator profiles.</h2>
                    <p>You will need to create a creator profile before posting your creations.</p>
                    <Link to="/newcreator"><Button variant="success">Create a Creator Profile</Button></Link>
                </div>
                </Row>
            </Container>
        )
    }

    return (
        <Container fluid className="me-0 ms-0 p-0">
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <h3>Select a Creator Profile to Start Creating:</h3>
                    <select onChange={(e) => {
                        setCreatorId(parseInt(e.target.value))
                        }}>
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
                    { displayCreator ?<select onChange={(e) => setContentType(e.target.value)}>
                        <option value="">Select Creation Type</option>
                        <option value="writing">Writing</option>
                        <option value="audio">Audio</option>
                        <option value="art">Art(Images)</option>
                        <option value="video">Video</option>
                    </select> : null}
                </Col>
            </Row>
            <Row>
                {contentType === "writing" && displayCreator ? <CreateWritingForm creator={displayCreator} />: null}
                {contentType === "art" && displayCreator ?<CreateArtForm creator={displayCreator} contentType={contentType}/> : null}
                {contentType === "video" && displayCreator ?<CreateVideoForm creator={displayCreator} contentType={contentType}/> : null}
                {contentType === "audio" && displayCreator ?<CreateAudioForm creator={displayCreator} contentType={contentType}/> : null}
            </Row>
            
        </Container>
    )
}

export default CreateCreationPage