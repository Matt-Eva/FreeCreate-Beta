import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import TopNav from "../navigation/TopNav"
import { useState } from "react"
import CreateArtForm from "./CreateArtForm"
import CreateWritingForm from "./CreateWritingForm"
import CreateAudioForm from "./CreateAudioForm"
import CreateVideoForm from "./CreateVideoForm"

function CreateCreationPage() {
    const [contentType, setContentType] = useState("")
    console.log(contentType)
    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <h1>Create!</h1>
                <select onChange={(e) => setContentType(e.target.value)}>
                    <option value="">Select Creation Type</option>
                    <option value="writing">Writing</option>
                    <option value="audio">Audio</option>
                    <option value="art">Art(Images)</option>
                    <option value="video">Video</option>
                </select>
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