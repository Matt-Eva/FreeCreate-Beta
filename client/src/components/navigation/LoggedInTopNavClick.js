import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { Link, NavLink } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayTypeWriting, setDisplayTypeAudio, setDisplayTypeArt, setDisplayTypeVideo, setDisplayTypeAll } from "../display/displayTypeSlice"


function LoggedInTopNavClick() {
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
        <Container fluid>
            <Row className="text-center">
                <Col className="d-flex justify-content-center">
                    {displayType === "writing" ? <NavLink to="/loggedout"onClick={setWriting} className="me-2" style={{"background": "hsl(180, 90%, 90%)"}}><h4>Writing</h4></NavLink> :<NavLink to="/loggedout" className="me-2" onClick={setWriting}><h4>Writing</h4></NavLink>}

                    {displayType === "audio" ? <NavLink to="/loggedout" onClick={setAudio} className="me-2" style={{"background": "hsl(180, 90%, 90%)"}}><h4>Audio</h4></NavLink> :<NavLink to="/loggedout" className="me-2" onClick={setAudio}><h4>Audio</h4></NavLink> }

                    {displayType === "art" ? <NavLink to="/loggedout" className="me-2"><h4 onClick={setArt} style={{"background": "hsl(180, 90%, 90%)"}}>Art</h4></NavLink> :<NavLink to="/loggedout" className="me-2"><h4 onClick={setArt}>Art</h4></NavLink> }

                    {displayType === "video" ? <NavLink to="/loggedout"><h4 onClick={setVideo} style={{"background": "hsl(180, 90%, 90%)"}}>Video</h4></NavLink> :<NavLink to="/loggedout"><h4 onClick={setVideo}>Video</h4></NavLink> }
                </Col>
            </Row>
        </Container>
    )
}

export default LoggedInTopNavClick
