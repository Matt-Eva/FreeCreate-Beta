import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link, NavLink } from "react-router-dom"
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
        <Container fluid>
            <Row className="text-center">
                <Col className="d-flex justify-content-center">
                    {displayType === "writing" ? <NavLink to="/loggedout"onClick={setWriting} className="me-3 pe-2 ps-2 rounded" style={{"background": "hsl(180, 90%, 90%)"}}><h3>Writing</h3></NavLink> :<NavLink to="/loggedout" className="me-3 rounded pe-2 ps-2" onClick={setWriting}><h3>Writing</h3></NavLink>}

                    {displayType === "audio" ? <NavLink to="/loggedout" onClick={setAudio} className="me-3 pe-2 ps-2 rounded" style={{"background": "hsl(180, 90%, 90%)"}}><h3>Audio</h3></NavLink> :<NavLink to="/loggedout" className="me-3 pe-2 ps-2 rounded" onClick={setAudio}><h3>Audio</h3></NavLink> }

                    {displayType === "art" ? <NavLink to="/loggedout" className="me-3 pe-2 ps-2 rounded" onClick={setArt} style={{"background": "hsl(180, 90%, 90%)"}}><h3 >Art</h3></NavLink> :<NavLink to="/loggedout" className="me-3 pe-2 ps-2 rounded"><h3 onClick={setArt}>Art</h3></NavLink> }

                    {displayType === "video" ? <NavLink to="/loggedout" onClick={setVideo} className="pe-2 ps-2 rounded" style={{"background": "hsl(180, 50%, 80%)"}}><h3 >Video</h3></NavLink> :<NavLink to="/loggedout" className="pe-2 ps-2 rounded" onClick={setVideo}><h3 >Video</h3></NavLink> }
                </Col>
            </Row>
        </Container>
    )
}

export default LoggedOutTopNavClick
