import Dropdown from "react-bootstrap/Dropdown"

function ProfileDropdown() {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                My Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>View Profile</Dropdown.Item>
                <Dropdown.Item>Creator Profiles</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileDropdown
