import "./TopNav.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LoginButton from "../LoginButton/LoginButton"
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown"
import Icon from "../Icon/Icon"
import TopNavSelect from "../TopNavSelect/TopNavSelect"


function TopNav() {
    const user = useSelector(state => state.user.user)
    return (
        <div className="topnav">
            <Icon />
            <TopNavSelect />
            {user ? <Link to="/newcreation">Create</Link> : null}
            {user === null ? <LoginButton/> : <ProfileDropdown />}
        </div>
    )
}

export default TopNav
