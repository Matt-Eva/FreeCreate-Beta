import "./LoggedInTopNavClick.css"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { Link, NavLink } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayTypeWriting, setDisplayTypeAudio, setDisplayTypeArt, setDisplayTypeVideo, setDisplayTypeAll } from "../../state/displayTypeSlice"


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
        <div className="logged-in-topnav-click">
            {displayType === "writing" ? <NavLink to="/"onClick={setWriting} className="me-3 pe-2 ps-2 rounded" style={{"background": "hsl(180, 0%, 90%)"}}><h3>Writing</h3></NavLink> :<NavLink to="/" className="me-3 pe-2 ps-2 rounded" onClick={setWriting}><h3>Writing</h3></NavLink>}

            {displayType === "audio" ? <NavLink to="/" onClick={setAudio} className="me-3 pe-2 ps-2 rounded" style={{"background": "hsl(180, 0%, 90%)"}}><h3>Audio</h3></NavLink> :<NavLink to="/" className="me-3 pe-2 ps-2 rounded" onClick={setAudio}><h3>Audio</h3></NavLink> }

            {displayType === "art" ? <NavLink to="/" className="me-3 pe-2 ps-2 rounded" onClick={setArt} style={{"background": "hsl(180, 0%, 90%)"}}><h3>Art</h3></NavLink> :<NavLink to="/" className="me-3 pe-2 ps-2 rounded"><h3 onClick={setArt}>Art</h3></NavLink> }

            {displayType === "video" ? <NavLink to="/" onClick={setVideo} className="pe-2 ps-2 rounded" style={{"background": "hsl(180, 0%, 90%)"}}><h3>Video</h3></NavLink> :<NavLink to="/" className="pe-2 ps-2 rounded" onClick={setVideo}><h3 >Video</h3></NavLink> }
        </div>
    )
}

export default LoggedInTopNavClick
