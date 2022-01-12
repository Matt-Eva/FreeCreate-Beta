import Dropdown from "react-bootstrap/Dropdown"
import {useDispatch} from "react-redux"
import {removeUser} from "../userauth/userSlice"
import {useNavigate} from "react-router-dom"

function ProfileDropdown() {
const dispatch = useDispatch()
const navigate = useNavigate()

    function logout(){
        fetch("/logout", {method: "DELETE"})
        .then(() =>{
            dispatch(removeUser())
            navigate("/loggedout")
        })
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                My Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>View Profile</Dropdown.Item>
                <Dropdown.Item>Creator Profiles</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileDropdown
