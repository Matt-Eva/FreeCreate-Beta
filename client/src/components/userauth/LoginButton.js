import Button from 'react-bootstrap/Button'
import {showLogin} from "../userauth/userAuthModalSlice"
import {useDispatch} from "react-redux"

function LoginButton() {
    const dispatch = useDispatch()
    return (
        <Button onClick={()=> dispatch(showLogin()) }>Login</Button>
    )
}

export default LoginButton
