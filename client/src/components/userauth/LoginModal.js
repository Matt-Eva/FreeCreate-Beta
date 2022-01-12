import { Modal, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import {hideLogin, showSignup} from "./userAuthModalSlice"

function LoginModal() {
    const loginModal = useSelector(state => state.userAuthModal.loginModal)
    const dispatch = useDispatch()

    function hideModal(){
        dispatch(hideLogin())
    }

    function toggleModal(){
        dispatch(hideLogin())
        dispatch(showSignup())
    }

    return (
        <Modal show={loginModal} onHide={hideModal} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                Don't have an account yet? <Button variant="primary" onClick={toggleModal}>Sign Up</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LoginModal
