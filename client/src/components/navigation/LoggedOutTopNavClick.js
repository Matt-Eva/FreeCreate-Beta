import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayTypeWriting, setDisplayTypeAudio, setDisplayTypeArt, setDisplayTypeVideo, setDisplayTypeAll } from "../display/displayTypeSlice"


function LoggedOutTopNavClick() {
    const displayType = useSelector(state => state.displayType.displayType)
    const dispatch = useDispatch()

    function setWriting(){
        dispatch(setDisplayTypeWriting())
    }

    function setAudio(){
        dispatch(setDisplayTypeAudio())
    }

    function setArt(){
        dispatch(setDisplayTypeArt())
    }

    function setVideo(){
        dispatch(setDisplayTypeVideo())
    }

    return (
        <Container>
            <Row className="text-center">
            <Col>
                {displayType === "writing" ? <Link to="/loggedout"><h4 onClick={setWriting} style={{"background": "hsl(180, 90%, 90%)"}}>Writing</h4></Link> :<Link to="/loggedout"><h4 onClick={setWriting}>Writing</h4></Link> }
            </Col>
            <Col>
                {displayType === "audio" ? <Link to="/loggedout"><h4 onClick={setAudio} style={{"background": "hsl(180, 90%, 90%)"}}>Audio</h4></Link> :<Link to="/loggedout"><h4 onClick={setAudio}>Audio</h4></Link> }
            </Col>
            <Col>
                {displayType === "art" ? <Link to="/loggedout"><h4 onClick={setArt} style={{"background": "hsl(180, 90%, 90%)"}}>Art</h4></Link> :<Link to="/loggedout"><h4 onClick={setArt}>Art</h4></Link> }
            </Col>
            <Col>
                {displayType === "video" ? <Link to="/loggedout"><h4 onClick={setVideo} style={{"background": "hsl(180, 90%, 90%)"}}>Video</h4></Link> :<Link to="/loggedout"><h4 onClick={setVideo}>Video</h4></Link> }
            </Col>
            </Row>
        </Container>
    )
}

export default LoggedOutTopNavClick
