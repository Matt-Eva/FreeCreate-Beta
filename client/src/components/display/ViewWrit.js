import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setWritLikes, addWritLike, removeWritLike } from "../libraries/likesSlice.js"
import { addLikedWrit, removeLikedWrit} from "../libraries/likedCreationsSlice"

function ViewWrit() {
    const [writing, setWriting] = useState(null)
    const user = useSelector(state => state.user.user)
    const writLikes = useSelector(state => state.likes.writ_likes)
    const dispatch = useDispatch()
    const {id} = useParams()

    let isLiked = false
    let writLikeId = null
    if (writLikes.length !== 0 && writing !== null){
        writLikes.forEach(like =>{
            if (like.writing_id === writing.id ){
                console.log(writing)
                isLiked = true
                writLikeId = like.id
            }
        })
    }

    useEffect(()=>{
        fetch(`/api/writings/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    console.log(data)
                    setWriting(data)
                })
            }
        })
    }, [])

    useEffect(() => {
        if (writLikes.length === 0 && user !== null){
            fetch("/api/writ_likes")
            .then(r => r.json())
            .then(data => {
                console.log(data)
                dispatch(setWritLikes(data))
            })
        }
    }, [])

    function like(){
        const newLike ={
            writing_id: writing.id,
            user_id: user.id
        }
        const configObj ={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newLike)
        }

        fetch("/api/writ_likes", configObj)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            dispatch(addWritLike(data))
            dispatch(addLikedWrit(writing))
        })
    }

    function dislike(){
        fetch(`/api/writ_likes/${writLikeId}`, {method: "DELETE"})
        .then(() =>{
            dispatch(removeWritLike(writLikeId))
            dispatch(removeLikedWrit(writing.id))
        })
    }

    function listAdd(){

    }

    function libAdd(){

    }

    if (writing === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Row>
                <TopNav />
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
            <Row className="justify-content-center text-center">
                <h1>{writing.title}</h1>
                <p>{writing.content}</p>
            </Row>
        </Container>
    )
}

export default ViewWrit
