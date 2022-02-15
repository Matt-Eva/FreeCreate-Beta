import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setAudLikes, addAudLike, removeAudLike } from "../../state/likesSlice.js"
import { addLikedAud, removeLikedAud} from "../../state/likedCreationsSlice"
import { setAudLibItems, addAudLibItem, removeAudLibItem } from "../../state/libItemsSlice"
import { addLibAud, removeLibAud } from '../../state/myLibrarySlice'
import LibraryButton from '../interaction/LibraryButton'

function ViewAud() {
    const [audio, setAudio] = useState(null)
    const user = useSelector(state => state.user.user)
    const audLikes = useSelector(state => state.likes.aud_likes)
    const audLibItems = useSelector(state => state.libItems.audLibItems)
    const {id} = useParams()
    const dispatch = useDispatch()
    const libType = "aud"
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

    let inLib = false;
    let audLibItemId = null;
    if (audLibItems.length !== 0 && audio !== null){
        audLibItems.forEach(libItem =>{
            if (libItem.audio_id === audio.id){
                inLib = true
                audLibItemId = libItem.id
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

    useEffect(()=>{
        if (audLibItems.length === 0 && user !== null){
            console.log("fetching library")
            fetch("/api/aud_lib_items")
            .then(r =>{
                if(r.ok){
                    r.json().then(data =>{
                        console.log("library", data)
                        dispatch(setAudLibItems(data))
                    })
                }
            })
        }
    }, [user])

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
                <Col>
                    <LibraryButton libType={libType} user={user} inLib={inLib} libItemId={audLibItemId} creation={audio} addLibItemState={addAudLibItem} removeLibItemState={removeAudLibItem} addToLibraryState={addLibAud} removeFromLibraryState={removeLibAud}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <audio controls src={audio.content} style={{"width": "800px"}}>Your browser does not support this audio player</audio>
            </Row>
        </Container>
    )
}

export default ViewAud
