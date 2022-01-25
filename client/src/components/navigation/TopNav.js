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
        <Container className="mt-2">
            <Row>
            <Col sm={2}>
                <Icon />
            </Col>
            <Col sm={8}>
                {user ? <LoggedInTopNavClick />: <LoggedOutTopNavClick />}
            </Col>
            <Col className="align-middle">
                {user ? <Link to="/newcreation" className="align-middle">Create</Link> : null}
            </Col>
            <Col>
                {user === null ? <LoginButton/> : <ProfileDropdown />}
            </Col>
            </Row>
        </Container>
    )
}

export default TopNav
