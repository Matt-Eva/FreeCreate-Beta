import Container from "react-bootstrap/Container"
import LoginButton from "../userauth/LoginButton"
import ProfileDropdown from "./ProfileDropdown"
import { useSelector } from "react-redux"

function TopNav() {
    const user = useSelector(state => state.user.user)
    return (
        <Container>
            {user === null ? <LoginButton/> : <ProfileDropdown />}
        </Container>
    )
}

export default TopNav
