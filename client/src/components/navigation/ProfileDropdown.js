import Dropdown from "react-bootstrap/Dropdown"
import {useDispatch} from "react-redux"
import {removeUser} from "../userauth/userSlice"
import {setCreators} from "../userauth/creatorsSlice"
import { setWritLikes, setAudLikes, setVidLikes, setArtLikes} from "../libraries/likesSlice.js"
import {setLikedArt, setLikedVid, setLikedAud, setLikedWrit} from "../libraries/likedCreationsSlice"
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
            navigate("/loggedout")
        })
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                My Profile
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
