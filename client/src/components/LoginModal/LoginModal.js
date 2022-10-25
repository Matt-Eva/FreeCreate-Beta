import { Modal, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import {hideLogin, showSignup} from "../../state/userAuthModalSlice"
import {setUser} from "../../state/userSlice"
import { setCreators } from "../../state/creatorsSlice"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import {useState} from 'react'

function LoginModal() {
    const [errors, setErrors] = useState(null)
    const loginModal = useSelector(state => state.userAuthModal.loginModal)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const displayErrors = errors?.map(error => <p>{error}</p>)

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
           const configObj ={
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(values)
           }
           fetch('/login', configObj)
           .then(r =>{
               if(r.ok){
                   r.json().then(data =>{
                       setErrors(null)
                       dispatch(setUser(data))
                       dispatch(setCreators(data.creators))
                       formik.handleReset()
                       hideModal()
                       navigate("/")
                   })
               } else{
                r.json().then(data =>{
                    console.log(data)
                    setErrors(data.errors)
                })
               }
           })
            
        }
    })

    function hideModal(){
        dispatch(hideLogin())
    }

    function toggleModal(){
        formik.handleReset()
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
                        <Button variant="success" type="submit">Log in</Button>
                    </Form.Group>
                </Form>
                <br />
                {errors? displayErrors : null}
            </Modal.Body>
            <Modal.Footer>
                Don't have an account yet? <Button variant="success" onClick={toggleModal}>Sign Up</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LoginModal
