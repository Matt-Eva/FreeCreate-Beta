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
        <Container className="mt-0 mb-2 p-0 pt-2 pb-2 bg-light" fluid>
            <Row >
            <Col sm={2} className="d-flex align-items-center">
                <Icon />
            </Col>
            <Col sm={8} className="d-flex align-items-center">
                {user ? <LoggedInTopNavClick />: <LoggedOutTopNavClick />}
            </Col>
            <Col className="d-flex align-items-center">
                {user ? <Link to="/newcreation" >Create</Link> : null}
            </Col>
            <Col className="d-flex align-items-center">
                {user === null ? <LoginButton/> : <ProfileDropdown />}
            </Col>
            </Row>
        </Container>
    )
}

export default TopNav
