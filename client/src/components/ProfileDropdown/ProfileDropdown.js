import "./ProfileDropdown.css"
import Dropdown from "react-bootstrap/Dropdown"
import {useDispatch} from "react-redux"
import {removeUser} from "../../state/userSlice"
import {setCreators} from "../../state/creatorsSlice"
import { setWritLikes, setAudLikes, setVidLikes, setArtLikes} from "../../state/likesSlice.js"
import {setLikedArt, setLikedVid, setLikedAud, setLikedWrit} from "../../state/likedCreationsSlice"
import {useNavigate, Link} from "react-router-dom"

function ProfileDropdown() {
const dispatch = useDispatch()
const navigate = useNavigate()

    function logout(){
        fetch("/logout", {method: "DELETE"})
        .then(() =>{
            dispatch(removeUser())
            dispatch(setCreators([]))
            dispatch(setWritLikes([]))
            dispatch(setAudLikes([]))
            dispatch(setVidLikes([]))
            dispatch(setArtLikes([]))
        })
    }
    return (      
        <Dropdown className="profile-dropdown">
            <Dropdown.Toggle variant="success" className='profile-dropdown__toggle'>
                Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {/* <Dropdown.Item>View Profile</Dropdown.Item> */}
                <Dropdown.Item onClick={() =>navigate("/creatorprofiles")}>Creator Profiles</Dropdown.Item>
                <Dropdown.Item onClick={() =>{navigate("/newcreator")}}>Add Creator Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileDropdown
