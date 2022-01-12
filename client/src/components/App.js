import '../App.css';
import { Container, Row, Col } from "react-bootstrap"
import { Routes, Route } from "react-router-dom"
import HomepageLoggedIn from "./home/HomepageLoggedIn"
import HomepageLoggedOut from './home/HomepageLoggedOut';
import LoginModal from "./userauth/LoginModal"
import SignupModal from "./userauth/SignupModal"

function App() {
  return (
    <Container>
      <LoginModal />
      <SignupModal />
      <Routes>
        <Route path="/loggedout" element={<HomepageLoggedOut/>}/>
        <Route exact path="/" element={<HomepageLoggedIn/>}/>
      </Routes>
    </Container>
  );
}

export default App;
