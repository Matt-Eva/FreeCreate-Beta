import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import { Container, Row, Col } from "react-bootstrap"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "./userauth/userSlice"
import { setCreators } from "./userauth/creatorsSlice"
import { useEffect } from "react"
import HomepageLoggedIn from "./home/HomepageLoggedIn"
import HomepageLoggedOut from './home/HomepageLoggedOut';
import LoginModal from "./userauth/LoginModal"
import SignupModal from "./userauth/SignupModal"
import CreateCreationPage from "./forms/CreateCreationPage"
import CreateCreatorProfile from "./forms/CreateCreatorProfile"
import CreatorProfiles from "./profile/CreatorProfiles"
import EditCreatorProfile from './forms/EditCreatorProfile';
import ViewWrit from "./display/ViewWrit"
import ViewArt from "./display/ViewArt"
import ViewAud from "./display/ViewAud"
import ViewVid from "./display/ViewVid"
import EditArtPage from "./forms/EditArtPage"
import EditVideoPage from './forms/EditVideoPage';
import EditWritingPage from './forms/EditWritingPage';
import EditAudioPage from './forms/EditAudioPage';
import MyCreations from './libraries/MyCreations';
import LikedCreations from './libraries/LikedCreations';

function App() {
const navigate = useNavigate()
const dispatch = useDispatch()

  useEffect(()=>{
    fetch("/api/me")
    .then(r =>{
      if (r.ok){
        r.json().then(data =>{
          dispatch(setUser(data))
          dispatch(setCreators(data.creators))
        })
      } else {
        console.log("running")
        navigate("/loggedout")
      }
    })
  }, [])

  

  return (
    <Container fluid className="p-0 m-0">
      <LoginModal />
      <SignupModal />
      <Routes>
        <Route path="/view/writing/:creationtitle/:id" element={<ViewWrit />}/>
        <Route path="/view/audio/:creationtitle/:id" element={<ViewAud />}/>
        <Route path="/view/art/:creationtitle/:id" element={<ViewArt />}/>
        <Route path="/view/video/:creationtitle/:id" element={<ViewVid />}/>
        <Route path="/edit/writing" element={<EditWritingPage />}/>
        <Route path="/edit/audio" element={<EditAudioPage />}/>
        <Route path="/edit/art" element={<EditArtPage />}/>
        <Route path="/edit/video" element={<EditVideoPage />}/>
        <Route path="/mycreations" element={<MyCreations />}/>
        <Route path="/likedcreations" element={<LikedCreations />} />
        <Route path="/creatorprofiles" element={<CreatorProfiles />}/>
        <Route path="/editcreator" element={<EditCreatorProfile/>}/>
        <Route path="/newcreator" element={<CreateCreatorProfile />} />
        <Route path="/newcreation" element={<CreateCreationPage />}/>
        <Route path="/loggedout" element={<HomepageLoggedOut/>}/>
        <Route exact path="/" element={<HomepageLoggedIn/>}/>
      </Routes>
    </Container>
  );
}

export default App;
