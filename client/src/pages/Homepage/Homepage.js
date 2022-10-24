import "./Homepage.css"
import { useSelector, useDispatch } from "react-redux"
import { setQueryDisplayWriting, setQueryDisplayAudio, setQueryDisplayArt, setQueryDisplayVideo, setQueryDisplayAll } from "../../state/queryDisplaySlice"
import { useEffect } from "react"
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
    const dispatch = useDispatch()

    // console.log(queryDisplayWriting, queryDisplayArt, queryDisplayAudio, queryDisplayVideo)

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
        if (displayType === "all"){
            fetch("/api/writings")
            .then(r => {
                if(r.ok){
                    r.json().then(data =>{
                        dispatch(setQueryDisplayWriting(data))
                    })
                }else{
                    r.json().then(data =>{
                        console.log(data)
                    })
                }
            })
            fetch("/api/audios")
            .then(r => {
                if(r.ok){
                    r.json().then(data =>{
                        dispatch(setQueryDisplayAudio(data))
                    })
                }else{
                    r.json().then(data =>{
                        console.log(data)
                    })
                }
            })
            fetch("/api/arts")
            .then(r => {
                if(r.ok){
                    r.json().then(data =>{
                        dispatch(setQueryDisplayArt(data))
                    })
                }else{
                    r.json().then(data =>{
                        console.log(data)
                    })
                }
            })
            fetch("/api/videos")
            .then(r => {
                if(r.ok){
                    r.json().then(data =>{
                        dispatch(setQueryDisplayVideo(data))
                    })
                }else{
                    r.json().then(data =>{
                        console.log(data)
                    })
                }
            })
        } else{
            fetch(`/api/${displayType}s`)
            .then(r => {
                if(r.ok){
                    r.json().then(data =>{
                        if (displayType === "writing"){
                            dispatch(setQueryDisplayWriting(data))
                        } else if (displayType === "audio"){
                            dispatch(setQueryDisplayAudio(data))
                        }else if (displayType === "art"){
                            dispatch(setQueryDisplayArt(data))
                        }else if (displayType === "video"){
                            dispatch(setQueryDisplayVideo(data))
                        }
                    })
                }else{
                    r.json().then(data =>{
                        console.log(data)
                    })
                }
            })
        }

    }, [displayType])

    if (user === null){
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
