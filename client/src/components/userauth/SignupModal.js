import Modal from 'react-bootstrap/Modal' 
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import {useSelector, useDispatch} from "react-redux"
import {showLogin, hideSignup} from "./userAuthModalSlice"

function SignupModal() {
const signupModal = useSelector(state => state.userAuthModal.signupModal)
const dispatch = useDispatch()

    function hideModal(){
        dispatch(hideSignup())
    }

    function toggleModal(){
        dispatch(hideSignup())
        dispatch(showLogin())
    }


    return (
        <Modal show={signupModal} onHide={hideModal} backdrop="static" keyboard={false} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>

            </Form>
        </Modal.Body>
        <Modal.Footer>
            Already have an account? <Button variant="primary" onClick={toggleModal}>Log In</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default SignupModal
