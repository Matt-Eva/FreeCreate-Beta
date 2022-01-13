import Container from "react-bootstrap/Container"
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
            <Col>
                {displayType === "writing" ? <Link to="/loggedout"><h2 onClick={setWriting} style={{"background": "hsl(180, 90%, 90%)"}}>Writing | </h2></Link> :<Link to="/loggedout"><h2 onClick={setWriting}>Writing | </h2></Link> }
            </Col>
            <Col>
                {displayType === "audio" ? <Link to="/loggedout"><h2 onClick={setAudio} style={{"background": "hsl(180, 90%, 90%)"}}>Audio | </h2></Link> :<Link to="/loggedout"><h2 onClick={setAudio}>Audio | </h2></Link> }
            </Col>
            <Col>
                {displayType === "art" ? <Link to="/loggedout"><h2 onClick={setArt} style={{"background": "hsl(180, 90%, 90%)"}}>Art | </h2></Link> :<Link to="/loggedout"><h2 onClick={setArt}>Art | </h2></Link> }
            </Col>
            <Col>
                {displayType === "video" ? <Link to="/loggedout"><h2 onClick={setVideo} style={{"background": "hsl(180, 90%, 90%)"}}>Video | </h2></Link> :<Link to="/loggedout"><h2 onClick={setVideo}>Video | </h2></Link> }
            </Col>
        </Container>
    )
}

export default LoggedOutTopNavClick
