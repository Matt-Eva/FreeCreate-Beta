import { Container, Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { useSelector, useDispatch } from "react-redux"
import { setQueryDisplayWriting, setQueryDisplayAudio, setQueryDisplayArt, setQueryDisplayVideo, setQueryDisplayAll } from "../display/queryDisplaySlice"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import TopNav from "../navigation/TopNav"
import BrowseSearch from "../navigation/BrowseSearch"
import DisplayAllContainer from "../display/DisplayAllContainer"
import DisplayTypeContainer from "../display/DisplayTypeContainer"

function HomepageLoggedOut(){
    const user = useSelector(state => state.user.user)
    const displayType = useSelector(state => state.displayType.displayType)
    const queryDisplayWriting = useSelector(state => state.queryDisplay.queryDisplayWriting)
    const queryDisplayAudio = useSelector(state => state.queryDisplay.queryDisplayAudio)
    const queryDisplayArt = useSelector(state => state.queryDisplay.queryDisplayArt)
    const queryDisplayVideo = useSelector(state => state.queryDisplay.queryDisplayVideo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(user)

    useEffect(() =>{
        if (user !== null){
            navigate("/")
        }
    }, [user])


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

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col xs={6} sm={6}>
                    <Row>
                        <BrowseSearch displayType={displayType}/>
                    </Row>
                    <Row>
                        {displayType === "all" ? <DisplayAllContainer writing={queryDisplayWriting} audio={queryDisplayAudio} art={queryDisplayArt} video={queryDisplayVideo} /> : <DisplayTypeContainer displayType={displayType} display={singleTypeDisplay} />}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default HomepageLoggedOut
