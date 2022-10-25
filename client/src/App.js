import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "./state/userSlice"
import { setLoggedOutState } from './state/loggedOutSlice';
import { setCreators } from "./state/creatorsSlice"
import { useEffect } from "react"
import Homepage from "./pages/Homepage/Homepage"
import LoginModal from "./components/LoginModal/LoginModal"
import SignupModal from "./components/SignupModal/SignupModal"
import CreateCreationPage from "./pages/CreateCreationPage/CreateCreationPage"
import CreateCreatorProfile from "./pages/CreateCreatorProfile/CreateCreatorProfile"
import CreatorProfiles from "./pages/CreatorProfiles/CreatorProfiles"
import EditCreatorProfile from './pages/EditCreatorProfile/EditCreatorProfile';
import ViewWrit from "./pages/ViewWrit/ViewWrit"
import ViewArt from "./pages/ViewArt/ViewArt"
import ViewAud from "./pages/ViewAud/ViewAud"
import ViewVid from "./pages/ViewVid/ViewVid"
import EditArtPage from "./pages/EditArtPage/EditArtPage"
import EditVideoPage from './pages/EditVideoPage/EditVideoPage';
import EditWritingPage from './pages/EditWritingPage/EditWritingPage';
import EditAudioPage from './pages/EditAudioPage/EditAudioPage';
import MyCreations from './pages/MyCreations/MyCreations';
import MyLibrary from './pages/MyLibrary/MyLibrary';
import LikedCreations from './pages/LikedCreations/LikedCreations';
import MyList from './pages/MyList/MyList'

function App() {
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
        dispatch(setLoggedOutState(true))
      }
    })
  }, [])

  

  return (
    <div className="app">
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
        <Route path="/mylist" element={<MyList />} />
        <Route path="/mylibrary" element={<MyLibrary />} />
        <Route path="/likedcreations" element={<LikedCreations />} />
        <Route path="/creatorprofiles" element={<CreatorProfiles />}/>
        <Route path="/editcreator" element={<EditCreatorProfile/>}/>
        <Route path="/newcreator" element={<CreateCreatorProfile />} />
        <Route path="/newcreation" element={<CreateCreationPage />}/>
        <Route path="/audio" element={<Homepage />} />
        <Route path="/art" element={<Homepage />} />
        <Route path="/video" element={<Homepage />} />
        <Route path="/writing" element={<Homepage />} />
        <Route exact path="/" element={<Homepage/>}/>
      </Routes>
    </div>
  );
}

export default App;
