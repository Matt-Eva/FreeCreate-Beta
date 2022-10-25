import "./TopNavSelect.css"
import { Link } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayTypeWriting, setDisplayTypeAudio, setDisplayTypeArt, setDisplayTypeVideo} from "../../state/displayTypeSlice"


function TopNavSelect() {
    const displayType = useSelector(state => state.displayType.displayType)
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    const className = user ? "topnav-select--logged-in": "topnav-select"

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
        <div className={className}>
            {displayType === "writing" ? <Link to="/writing">Writing</Link> :<Link to="/writing" onClick={setWriting}>Writing</Link>}

            {displayType === "audio" ? <Link to="/audio">Audio</Link> :<Link to="/audio"  onClick={setAudio}>Audio</Link> }

            {displayType === "art" ? <Link to="/art">Art</Link> :<Link to="/art" onClick={setArt}>Art</Link> }

            {displayType === "video" ? <Link to="/video">Video</Link> :<Link to="/video" onClick={setVideo}>Video</Link> }
        </div>
    )
}

export default TopNavSelect;
