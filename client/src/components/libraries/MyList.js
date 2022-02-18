import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setListAll, setListArt, setListWrit, setlistAud, setListVid} from "../../state/myListSlice"
import TopNav from "../navigation/TopNav"
import DisplayAllContainer from '../display/DisplayAllContainer'
import DisplayTypeContainer from '../display/DisplayTypeContainer'
import Sidebar from "../navigation/Sidebar"
import styled from 'styled-components'

function MyList() {
const writing = useSelector(state => state.myList.listWrit)
const art = useSelector(state => state.myList.listArt)
const audio = useSelector(state => state.myList.listAud)
const video = useSelector(state => state.myList.listVid)
const listDisplayType = useSelector(state => state.listDisplayType.listDisplayType)
const dispatch = useDispatch()

let display;
    if (listDisplayType === "writing"){
        display = writing
    } else if(listDisplayType ==="art"){
        display = art
    } else if(listDisplayType === "audio"){
        display = audio
    } else if (listDisplayType === "video"){
        display = video
    }

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


    return (
        <div>
            <div>
                <TopNav />
            </div>
            <Display>
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="display">
                    {listDisplayType === "all" ? <DisplayAllContainer writing={writing} art={art} audio={audio} video={video}/> : <DisplayTypeContainer display={display} displayType={listDisplayType}/>}
                </div>
            </Display>
        </div>
    )
}

export default MyList

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