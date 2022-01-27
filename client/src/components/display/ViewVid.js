import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setVidLikes, addVidLike, removeVidLike } from "../libraries/likesSlice.js"
import { addLikedVid, removeLikedVid} from "../libraries/likedCreationsSlice"

function ViewVid() {
    const [video, setVideo] = useState(null)
    const user = useSelector(state => state.user.user)
    const vidLikes = useSelector(state => state.likes.vid_likes)
    const dispatch = useDispatch()
    const {id} = useParams()

    let isLiked = false
    let vidLikeId = null
    if (vidLikes.length !== 0 && video !== null){
        vidLikes.forEach(like =>{
            if (like.video_id === video.id ){
                console.log(video)
                isLiked = true
                vidLikeId = like.id
            }
        })
    }

    useEffect(()=>{
        fetch(`/api/videos/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setVideo(data)
                })
            }
        })
    }, [])

    useEffect(() => {
        if (vidLikes.length === 0 && user !== null){
            fetch("/api/vid_likes")
            .then(r => r.json())
            .then(data => {
                console.log(data)
                dispatch(setVidLikes(data))
            })
        }
    }, [])

    function like(){
        const newLike ={
            video_id: video.id,
            user_id: user.id
        }
        const configObj ={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newLike)
        }

        fetch("/api/vid_likes", configObj)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            dispatch(addVidLike(data))
            dispatch(addLikedVid(video))
        })
    }

    function dislike(){
        fetch(`/api/vid_likes/${vidLikeId}`, {method: "DELETE"})
        .then(() =>{
            dispatch(removeVidLike(vidLikeId))
            dispatch(removeLikedVid(video.id))
        })
    }

    function listAdd(){

    }

    function libAdd(){
        
    }

    if (video === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container fluid className="p-0">
            <Row>
                <TopNav />
            </Row>
            <Row className="justify-content-center text-center">
                <h1>{video.title}</h1>
                <video controls style={{"width": "1000px", "maxHeight": "600px"}}><source src={video.content} type="video/mp4" /></video>
            </Row>
            <Row>
                {user ? <Col>
                    {isLiked ? <Button variant="success" onClick={dislike}>Remove Like</Button> : <Button variant="success" onClick={like}>Like</Button> }
                    {/* <Button variant="success">Add to Library</Button>
                    <Button variant="success">Add to Reading List</Button> */}
                </Col> : <Col>
                    <Button variant="success" disabled>Like</Button>
                    {/* <Button variant="success" disabled>Add to Library</Button>
                    <Button variant="success" disabled>Add to Reading List</Button> */}
                </Col>}
            </Row>
        </Container>
    )
}

export default ViewVid
