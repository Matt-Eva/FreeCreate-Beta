import {useEffect} from 'react'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useSelector, useDispatch} from "react-redux"
import {setLibArt, setLibVid, setLibAud, setLibWrit} from "../../state/myLibrarySlice"
import TopNav from "../navigation/TopNav"
import DisplayAllContainer from "../display/DisplayAllContainer"
import Sidebar from "../navigation/Sidebar"
import styled from 'styled-components'

function MyLibrary() {
    const writing = useSelector(state => state.myLibrary.lib_writ)
    const art = useSelector(state => state.myLibrary.lib_art)
    const video = useSelector(state => state.myLibrary.lib_vid)
    const audio = useSelector(state => state.myLibrary.lib_aud)
    const dispatch = useDispatch()

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
                    <DisplayAllContainer writing={writing} art={art} video={video} audio={audio}/>
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