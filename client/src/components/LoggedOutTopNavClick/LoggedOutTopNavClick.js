import "./LoggedOutTopNavClick.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link, NavLink } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayTypeWriting, setDisplayTypeAudio, setDisplayTypeArt, setDisplayTypeVideo, setDisplayTypeAll } from "../../state/displayTypeSlice"


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
        <div className="logged-out-topnav-click">
            {displayType === "writing" ? <Link to="/loggedout">Writing</Link> :<Link to="/loggedout"  onClick={setWriting}>Writing</Link>}

            {displayType === "audio" ? <Link to="/loggedout">Audio</Link> :<Link to="/loggedout"  onClick={setAudio}>Audio</Link> }

            {displayType === "art" ? <Link to="/loggedout">Art</Link> :<Link to="/loggedout" onClick={setArt}>Art</Link> }

            {displayType === "video" ? <Link to="/loggedout">Video</Link> :<Link to="/loggedout" onClick={setVideo}>Video</Link> }
        </div>
    )
}

export default LoggedOutTopNavClick
