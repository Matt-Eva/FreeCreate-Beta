import "./Icon.css"
import {Link} from "react-router-dom"
import { useDispatch} from "react-redux"
import {setDisplayTypeAll} from "../../state/displayTypeSlice"

function Icon() {
    const dispatch = useDispatch()

    function displayAll(){
        dispatch(setDisplayTypeAll())
    }

    return (
        <div className='icon'>
            <Link to="/" onClick={displayAll}>FreeCreate</Link>
        </div>
    )
}

export default Icon
