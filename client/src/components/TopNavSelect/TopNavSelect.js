import "./TopNavSelect.css"
import { Link } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayTypeWriting, setDisplayTypeAudio, setDisplayTypeArt, setDisplayTypeVideo} from "../../state/displayTypeSlice"


function TopNavSelect() {
    const displayType = useSelector(state => state.displayType.displayType)
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()
    
    const redirect = user ? "/" : "/loggedout"

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
            {displayType === "writing" ? <Link to={redirect}>Writing</Link> :<Link to={redirect}  onClick={setWriting}>Writing</Link>}

            {displayType === "audio" ? <Link to={redirect}>Audio</Link> :<Link to={redirect}  onClick={setAudio}>Audio</Link> }

            {displayType === "art" ? <Link to={redirect}>Art</Link> :<Link to={redirect} onClick={setArt}>Art</Link> }

            {displayType === "video" ? <Link to={redirect}>Video</Link> :<Link to={redirect} onClick={setVideo}>Video</Link> }
        </div>
    )
}

export default TopNavSelect;
