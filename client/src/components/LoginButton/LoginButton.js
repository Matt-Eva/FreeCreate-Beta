import Button from 'react-bootstrap/Button'
import {showLogin} from "../../state/userAuthModalSlice"
import {useDispatch} from "react-redux"

function LoginButton() {
    const dispatch = useDispatch()
    return (
        <Button variant="success" onClick={()=> dispatch(showLogin()) }>Login</Button>
    )
}

export default LoginButton
