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
    const writing = useSelector(state => state.myLibrary.libWrit)
    const art = useSelector(state => state.myLibrary.libArt)
    const video = useSelector(state => state.myLibrary.libVid)
    const audio = useSelector(state => state.myLibrary.libAud)
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
            fetch('/api/libwrit')
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setLibWrit(data.writ))
            })
        } else if(libDisplayType === "video" && video.length === 0){
            console.log("fetching lib video")
            fetch('/api/libvid')
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setLibVid(data.vid))
            })
        } else if(libDisplayType === "audio" && audio.length === 0){
            console.log("fetching lib audio")
            fetch('/api/libaud')
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setLibAud(data.aud))
            })
        } else if(libDisplayType === "art" && art.length === 0){
            console.log("fetching lib art")
            fetch('/api/libart')
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setLibArt(data.art))
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
        grid-column: 1; 
        max-width: 20%;
        background: hsl(180, 0%, 90%);
        float: left;
    }
    
    .display{
        grid-column: 2 / 5;
    }
`