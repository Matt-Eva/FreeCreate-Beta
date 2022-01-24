import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setArtLikes, addArtLike, removeArtLike } from "../libraries/likesSlice.js"

function ViewArt() {
    const [art, setArt] = useState(null)
    const user = useSelector(state => state.user.user)
    const artLikes = useSelector(state => state.likes.art_likes)
    const {id} = useParams()
    const dispatch = useDispatch()
    console.log(artLikes)
   
    let isLiked = false
    let artLikeId = null
    if (artLikes.length !== 0 && art !== null){
        artLikes.forEach(like =>{
            if (like.art_id === art.id ){
                isLiked = true
                artLikeId = like.id
            }
        })
    }

    useEffect(() => {
        if (artLikes.length === 0){
            fetch("/api/art_likes")
            .then(r => r.json())
            .then(data => {
                console.log(data)
                dispatch(setArtLikes(data))
            })
        }
    }, [])

    useEffect(()=>{
        fetch(`/api/arts/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setArt(data)
                })
            }
        })
    }, [])

    function like(){
        const newLike ={
            art_id: art.id,
            user_id: user.id
        }
        const configObj ={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newLike)
        }

        fetch("/api/art_likes", configObj)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            dispatch(addArtLike(data))
        })
    }

    function dislike(){
        fetch(`/api/art_likes/${artLikeId}`, {method: "DELETE"})
        .then(() =>{
            dispatch(removeArtLike(artLikeId))
        })
    }

    function listAdd(){

    }

    function libAdd(){
        
    }

    if (art === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row className="justify-content-center text-center">
                <h1>{art.title}</h1>
                <Image src={art.content} style={{"width": "800px"}}/>
            </Row>
            <Row>
                <Col>
                    {isLiked ? <Button variant="success" onClick={dislike}>Remove Like</Button> : <Button variant="success" onClick={like}>Like</Button>}
                    <Button variant="success" onClick={libAdd}>Add to Library</Button>
                    <Button variant="success" onClick={listAdd}>Add to Reading List</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewArt
