import Modal from 'react-bootstrap/Modal' 
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import { useFormik } from "formik"
import * as Yup from "yup"
import {useSelector, useDispatch} from "react-redux"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import {showLogin, hideSignup} from "./userAuthModalSlice"
import { setUser } from "./userSlice"


function SignupModal() {
const [errors, setErrors] = useState(null)
const signupModal = useSelector(state => state.userAuthModal.signupModal)
const dispatch = useDispatch()
const navigate = useNavigate()

const displayErrors = errors?.map(error => <p>{error}</p>)

const formik = useFormik({
    initialValues: {
        username: "",
        password: "",
        password_confirmation: "",
        nickname: "",
        email: "",
    },
    validationSchema: Yup.object({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    }),
    onSubmit: (values) =>{
        // e.preventDefault()
        console.log(values)
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }

        fetch("/api/signup", configObj)
        .then(r => {
            if (r.ok){
                r.json().then(data => {
                    console.log(data)
                    dispatch(setUser(data))
                    formik.handleReset()
                    hideModal()
                    navigate('/')
                })
            } else {
                r.json().then(data =>{
                    console.log(data)
                    setErrors(data.errors)
                })
            }
        })
        
    }
})

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
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" name="password_confirmation" placeholder="Confirm password..." value={formik.values.password_confirmation}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter your email address" value={formik.values.email}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nickname:</Form.Label>
                        <Form.Control type="text" name="nickname" placeholder="What name would you like to be called? (optional)" value={formik.values.nickname}/>
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Profile Pic:</Form.Label>
                        <Form.Control type="file" name="password" placeholder="Enter password..." value={formik.values.password}/>
                    </Form.Group> */}
                    <Form.Group>
                        <br />
                        <Button type="submit">Sign up</Button>
                    </Form.Group>
                </Form>
                {errors? displayErrors : null}
        </Modal.Body>
        <Modal.Footer>
            Already have an account? <Button variant="primary" onClick={toggleModal}>Log In</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default SignupModal
