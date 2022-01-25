import {useEffect} from 'react'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useSelector, useDispatch} from "react-redux"
import {setLikedArt, setLikedVid, setLikedAud, setLikedWrit} from "../libraries/likedCreationsSlice"
import DisplayAllContainer from "../display/DisplayAllContainer"
import TopNav from '../navigation/TopNav'
import Sidebar from "../navigation/Sidebar"


function LikedCreations() {
    const writing = useSelector(state => state.likedCreations.liked_writ)
    const art = useSelector(state => state.likedCreations.liked_art)
    const video = useSelector(state => state.likedCreations.liked_vid)
    const audio = useSelector(state => state.likedCreations.liked_aud)
    const dispatch = useDispatch()

    useEffect(() =>{
        if((writing.length === 0 || art.length === 0) || (video.length === 0 || audio.length === 0)){
            console.log("fetching likes")
            fetch("/alllikedcreations")
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setLikedArt(data.art))
                dispatch(setLikedVid(data.video))
                dispatch(setLikedWrit(data.writing))
                dispatch(setLikedAud(data.audio))
            })
        }
    }, [])

    return (
        <Container style={{"margin": "0px"}}>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <Sidebar/>
                </Col>
                <Col>
                    <DisplayAllContainer writing={writing} art={art} video={video} audio={audio}/>
                </Col>
            </Row>
        </Container>
    )
}

export default LikedCreations
