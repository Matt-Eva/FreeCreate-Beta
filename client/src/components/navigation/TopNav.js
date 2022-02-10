import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
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
        <Container className="bg-info mb-2 pe-1" fluid>
            <Row>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} className="d-flex align-items-center">
                    <Icon />
                </Col>
                <Col xs={6} sm={6} md={8} lg={8} xl={8} xxl={8} className="d-flex align-items-center">
                    {user ? <LoggedInTopNavClick />: <LoggedOutTopNavClick />}
                </Col>
                <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1} className="d-flex align-items-center">
                    {user ? <Link to="/newcreation" >Create</Link> : null}
                </Col>
                <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1} className="d-flex align-items-center">
                    {user === null ? <LoginButton/> : <ProfileDropdown />}
                </Col>
            </Row>
        </Container>
    )
}

export default TopNav
