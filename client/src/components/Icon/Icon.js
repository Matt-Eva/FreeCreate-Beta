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
        <>
        {user ? <h2 onClick={displayAll}><Link to="/">FreeCreate</Link></h2> : <h2 onClick={displayAll}><Link to="/loggedout">FreeCreate</Link></h2>}
        </>
    )
}

export default Icon
