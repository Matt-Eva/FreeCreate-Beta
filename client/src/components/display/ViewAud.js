import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setAudLikes, addAudLike, removeAudLike } from "../libraries/likesSlice.js"
import { addLikedAud, removeLikedAud} from "../libraries/likedCreationsSlice"

function ViewAud() {
    const [audio, setAudio] = useState(null)
    const user = useSelector(state => state.user.user)
    const audLikes = useSelector(state => state.likes.aud_likes)
    const dispatch = useDispatch()
    const {id} = useParams()
    console.log(audLikes)

    let isLiked = false
    let audLikeId = null
    if (audLikes.length !== 0 && audio !== null){
        audLikes.forEach(like =>{
            if (like.audio_id === audio.id ){
                console.log(audio)
                isLiked = true
                audLikeId = like.id
            }
        })
    }

    useEffect(()=>{
        fetch(`/api/audios/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setAudio(data)
                })
            }
        })
    }, [])

    useEffect(() => {
        if (audLikes.length === 0 && user !== null){
            fetch("/api/aud_likes")
            .then(r => r.json())
            .then(data => {
                console.log(data)
                dispatch(setAudLikes(data))
            })
        }
    }, [])

    function like(){
        const newLike ={
            audio_id: audio.id,
            user_id: user.id
        }
        const configObj ={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newLike)
        }

        fetch("/api/aud_likes", configObj)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            dispatch(addAudLike(data))
            dispatch(addLikedAud(audio))
        })
    }

    function dislike(){
        fetch(`/api/aud_likes/${audLikeId}`, {method: "DELETE"})
        .then(() =>{
            dispatch(removeAudLike(audLikeId))
            dispatch(removeLikedAud(audio.id))
        })
    }

    function listAdd(){

    }

    function libAdd(){
        
    }

    if (audio === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container fluid>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col sm={3}>
                    <Image src={audio.thumbnail} style={{"width": "300px"}}/>
                </Col>
                <Col sm={6}>
                    <h1 className="text-start">{audio.title}</h1>
                    {user ? (isLiked ? <Button variant="success" onClick={dislike}>Remove Like</Button> : <Button variant="success" onClick={like}>Like</Button> )
                    :  <Button variant="success" disabled>Like</Button>}
                </Col>
            </Row>
            <Row className="justify-content-center">
                <audio controls src={audio.content} style={{"width": "800px"}}>Your browser does not support this audio player</audio>
            </Row>
        </Container>
    )
}

export default ViewAud
