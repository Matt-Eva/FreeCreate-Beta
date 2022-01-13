import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LoginButton from "../userauth/LoginButton"
import ProfileDropdown from "./ProfileDropdown"
import Icon from "./Icon"
import LoggedInTopNavClick from "./LoggedInTopNavClick"
import LoggedOutTopNavClick from "./LoggedOutTopNavClick"


function TopNav() {
    const user = useSelector(state => state.user.user)
    return (
        <Container>
            <Col>
                <Icon />
            </Col>
            <Col>
                {user ? <LoggedInTopNavClick />: <LoggedOutTopNavClick />}
            </Col>
            <Col>
                {user === null ? <LoginButton/> : <ProfileDropdown />}
            </Col>
        </Container>
    )
}

export default TopNav
