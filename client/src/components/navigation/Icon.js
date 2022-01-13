import Link from "react-router-dom"
import {useSelector} from "react-redux"

function Icon() {
    const user = useSelector(state => state.user.user)
    return (
        <>
        {user ? <h2><Link to="/">FreeCreate</Link></h2> : <h2><Link to="/loggedout">FreeCreate</Link></h2>}
        </>
    )
}

export default Icon
