import { Modal, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import {hideLogin, showSignup} from "./userAuthModalSlice"
import { useFormik } from "formik"
import * as Yup from "yup"

function LoginModal() {
    const loginModal = useSelector(state => state.userAuthModal.loginModal)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (values) =>{
            // e.preventDefault()
            console.log(values)
            formik.handleReset()
        }
    })

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
                <Form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter username..." value={formik.values.username}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter password..." value={formik.values.password}/>
                    </Form.Group>
                    <Form.Group>
                        <br/>
                        <Button type="submit">Log in</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                Don't have an account yet? <Button variant="primary" onClick={toggleModal}>Sign Up</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LoginModal
