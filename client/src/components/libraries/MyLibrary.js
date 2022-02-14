import {useEffect} from 'react'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useSelector, useDispatch} from "react-redux"
import {setLibAll, setLibArt, setLibVid, setLibAud, setLibWrit} from "../../state/myLibrarySlice"
import TopNav from "../navigation/TopNav"
import DisplayAllContainer from "../display/DisplayAllContainer"
import DisplayTypeContainer from "../display/DisplayTypeContainer"
import Sidebar from "../navigation/Sidebar"
import styled from 'styled-components'

function MyLibrary() {
    const writing = useSelector(state => state.myLibrary.lib_writ)
    const art = useSelector(state => state.myLibrary.lib_art)
    const video = useSelector(state => state.myLibrary.lib_vid)
    const audio = useSelector(state => state.myLibrary.lib_aud)
    const libDisplayType = useSelector(state => state.libDisplayType.libDisplayType)
    const dispatch = useDispatch()

    console.log(libDisplayType)
    console.log(writing, art, video, audio)

    useEffect(()=>{
        if(libDisplayType === "all" && ((writing.length === 0 || art.length === 0) || (video.length === 0 || audio.length === 0))){
            console.log("fetching all lib items")
            fetch("/alllibcreations")
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setLibAll({art: data.art, writing: data.writing, audio: data.audio, video: data.video}))
            })
        } else if(libDisplayType === "writing" && writing.length === 0){
            console.log("fetching lib writing")
            fetch('/api/libwriting')
            .then(r => r.json())
            .then(data =>{
                console.log(data)
            })
        } else if(libDisplayType === "video" && video.length === 0){
            console.log("fetching lib video")
            fetch('/api/libvideo')
            .then(r => r.json())
            .then(data =>{
                console.log(data)
            })
        }
    },[libDisplayType])

    let display;
    if (libDisplayType === "writing"){
        display = writing
    } else if(libDisplayType ==="art"){
        display = art
    } else if(libDisplayType === "audio"){
        display = audio
    } else if (libDisplayType === "video"){
        display = video
    }

    return (
        <div>
            <div>
                <TopNav />
            </div>
            <Display>
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="display">
                    {libDisplayType === "all" ? <DisplayAllContainer writing={writing} art={art} video={video} audio={audio}/> : <DisplayTypeContainer display={display} displayType={libDisplayType} />}
                </div>
            </Display>
        </div>
    )
}

export default MyLibrary

const Display = styled.div`
    grid-template-columns: 1fr 4fr;

    .sidebar{
        grid-column: 1
    }
    
    .display{
        grid-column: 2 / 5;
    }
`