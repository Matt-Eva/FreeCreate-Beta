import "./TopNav.css"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LoginButton from "../LoginButton/LoginButton"
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown"
import Icon from "../Icon/Icon"
import LoggedInTopNavClick from "../LoggedInTopNavClick/LoggedInTopNavClick"
import LoggedOutTopNavClick from "../LoggedOutTopNavClick/LoggedOutTopNavClick"


function TopNav() {
    const user = useSelector(state => state.user.user)
    return (
        <div className="topnav">
            <Icon />
            {user ? <LoggedInTopNavClick />: <LoggedOutTopNavClick />}
            {user ? <Link to="/newcreation" >Create</Link> : null}
            {user === null ? <LoginButton/> : <ProfileDropdown />}
        </div>
    )
}

export default TopNav
