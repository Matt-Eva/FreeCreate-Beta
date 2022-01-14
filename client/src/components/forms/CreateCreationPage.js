import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import TopNav from "../navigation/TopNav"
import { useState } from "react"
import { useSelector } from "react-redux"
import CreateArtForm from "./CreateArtForm"
import CreateWritingForm from "./CreateWritingForm"
import CreateAudioForm from "./CreateAudioForm"
import CreateVideoForm from "./CreateVideoForm"

function CreateCreationPage() {
    const user = useSelector(state => state.user.user)
    const [contentType, setContentType] = useState("")
    const [creator, setCreator] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    console.log(contentType)
    console.log(user.creators)
    const creatorOptions = user.creators?.map(creator => <option value={creator.name}>{creator.name}</option>)
    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
            <h1>Create!</h1>
                    <select>
                        <option>Select Creator Profile</option>
                        {creatorOptions}
                    </select>
            </Row>
            <Row>
                <Col>
                    {creator ? <h2>{creator.name}</h2> : <h2>Please choose a creator Profile</h2>}
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