import "./Homepage.css"
import { useSelector, useDispatch } from "react-redux"
import { setQueryDisplayWriting, setQueryDisplayAudio, setQueryDisplayArt, setQueryDisplayVideo, setQueryDisplayAll } from "../../state/queryDisplaySlice"
import { setDisplayTypeArt, setDisplayTypeAudio, setDisplayTypeVideo, setDisplayTypeWriting, setDisplayTypeAll } from "../../state/displayTypeSlice"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import TopNav from "../../components/TopNav/TopNav"
import Sidebar from "../../components/Sidebar/Sidebar"
import BrowseSearch from "../../components/BrowseSearch/BrowseSearch"
import DisplayAllContainer from "../../components/DisplayAllContainer/DisplayAllContainer"
import DisplayTypeContainer from "../../components/DisplayTypeContainer/DisplayTypeContainer"

function Homepage() {
    const user = useSelector(state => state.user.user)
    const displayType = useSelector(state => state.displayType.displayType)
    const queryDisplayWriting = useSelector(state => state.queryDisplay.queryDisplayWriting)
    const queryDisplayAudio = useSelector(state => state.queryDisplay.queryDisplayAudio)
    const queryDisplayArt = useSelector(state => state.queryDisplay.queryDisplayArt)
    const queryDisplayVideo = useSelector(state => state.queryDisplay.queryDisplayVideo)
    const loggedOut = useSelector(state => state.loggedOutState.loggedOutState)
    const dispatch = useDispatch()
    const pathname = useLocation().pathname

    let singleTypeDisplay = []
    if (displayType === "writing"){
        singleTypeDisplay = queryDisplayWriting
    } else if (displayType === "audio"){
        singleTypeDisplay = queryDisplayAudio
    } else if (displayType === "art"){
        singleTypeDisplay = queryDisplayArt
    }  else if (displayType === "video"){
        singleTypeDisplay = queryDisplayVideo
    }

    useEffect(()=>{
            if (pathname === "/" && ((queryDisplayWriting.length === 0 || queryDisplayAudio.length === 0) || (queryDisplayArt.length === 0 || queryDisplayVideo.length === 0))){
                fetch('/allcreations')
                .then(r =>{
                    if(r.ok){
                        r.json().then(data =>{
                            dispatch(setQueryDisplayWriting(data.writing))
                            dispatch(setQueryDisplayAudio(data.audio))
                            dispatch(setQueryDisplayArt(data.art))
                            dispatch(setQueryDisplayVideo(data.video))
                            dispatch(setDisplayTypeAll())
                        })
                    } else{
                        r.json().then(data =>{
                            console.log(data)
                        })
                    }
                })
            } else if(pathname === "/writing" && queryDisplayWriting.length === 0){
                fetch(`/api/writings`)
                .then(r => {
                    if(r.ok){
                        r.json().then(data =>{
                            dispatch(setQueryDisplayWriting(data))
                            dispatch(setDisplayTypeWriting())
                        })
                    }else{
                        r.json().then(data =>{
                            console.log(data)
                        })
                    }
                })
            } else if(pathname === "/art" && queryDisplayArt.length === 0){
                fetch(`/api/arts`)
                .then(r => {
                    if(r.ok){
                        r.json().then(data =>{
                            dispatch(setQueryDisplayArt(data))
                            dispatch(setDisplayTypeArt())
                        })
                    }else{
                        r.json().then(data =>{
                            console.log(data)
                        })
                    }
                })
            } else if(pathname === "/audio" && queryDisplayAudio.length === 0){
                fetch(`/api/audios`)
                .then(r => {
                    if(r.ok){
                        r.json().then(data =>{
                            dispatch(setQueryDisplayAudio(data))
                            dispatch(setDisplayTypeAudio())
                        })
                    }else{
                        r.json().then(data =>{
                            console.log(data)
                        })
                    }
                })
            }else if(pathname === "/video" && queryDisplayVideo.length === 0){
                fetch(`/api/videos`)
                .then(r => {
                    if(r.ok){
                        r.json().then(data =>{
                            dispatch(setQueryDisplayVideo(data))
                            dispatch(setDisplayTypeVideo())
                        })
                    }else{
                        r.json().then(data =>{
                            console.log(data)
                        })
                    }
                })
            }
    }, [pathname])

    if (user === null && loggedOut === false){
        return(<h1>Loading...</h1>)
      }

    return (
        <div className="homepage">
            <TopNav />
            <div className={user ? "homepage__main" : "homepage_main--logged-out"}>
                {user ? <Sidebar /> : null}
                <BrowseSearch displayType={displayType}/>
                {displayType === "all" ? <DisplayAllContainer writing={queryDisplayWriting} audio={queryDisplayAudio} art={queryDisplayArt} video={queryDisplayVideo} /> : <DisplayTypeContainer displayType={displayType} display={singleTypeDisplay} />}
            </div>
        </div>
    )
}

export default Homepage
