import "./LoginButton.css"
import {showLogin} from "../../state/userAuthModalSlice"
import {useDispatch} from "react-redux"

function LoginButton() {
    const dispatch = useDispatch()
    return (
        <button onClick={()=> dispatch(showLogin()) } className='login-button'>Login</button>
    )
}

export default LoginButton
