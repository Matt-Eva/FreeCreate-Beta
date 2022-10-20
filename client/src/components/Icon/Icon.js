import "./Icon.css"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {setDisplayTypeAll} from "../../state/displayTypeSlice"

function Icon() {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    function displayAll(){
        dispatch(setDisplayTypeAll())
    }

    return (
        <div className='icon'>
        {user ? <Link to="/" onClick={displayAll}>FreeCreate</Link> : <Link to="/loggedout" onClick={displayAll}>FreeCreate</Link>}
        </div>
    )
}

export default Icon
