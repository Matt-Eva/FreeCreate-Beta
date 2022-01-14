import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "./userauth/userSlice"
import { useEffect } from "react"
import HomepageLoggedIn from "./home/HomepageLoggedIn"
import HomepageLoggedOut from './home/HomepageLoggedOut';
import LoginModal from "./userauth/LoginModal"
import SignupModal from "./userauth/SignupModal"
import CreateCreationPage from "./forms/CreateCreationPage"
import CreateCreatorProfile from "./forms/CreateCreatorProfile"

function App() {
const navigate = useNavigate()
const dispatch = useDispatch()

  useEffect(()=>{
    fetch("/api/me")
    .then(r =>{
      if (r.ok){
        r.json().then(data =>{
          dispatch(setUser(data))
        })
      } else {
        console.log("running")
        navigate("/loggedout")
      }
    })
  }, [])

  

  return (
    <Container fluid>
      <LoginModal />
      <SignupModal />
      <Routes>
        <Route path="/newcreator" element={<CreateCreatorProfile />} />
        <Route path="/newcreation" element={<CreateCreationPage />}/>
        <Route path="/loggedout" element={<HomepageLoggedOut/>}/>
        <Route exact path="/" element={<HomepageLoggedIn/>}/>
      </Routes>
    </Container>
  );
}

export default App;
