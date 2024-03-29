import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../../components/TopNav/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setAudLikes, addAudLike, removeAudLike } from "../../state/likesSlice.js"
import { addLikedAud, removeLikedAud} from "../../state/likedCreationsSlice"
import { setAudLibItems, addAudLibItem, removeAudLibItem } from "../../state/libItemsSlice"
import { setLibAud, addLibAud, removeLibAud } from '../../state/myLibrarySlice'
import { setAudListItems, addAudListItem, removeAudListItem } from '../../state/listItemsSlice'
import { setListAud, addListAud, removeListAud } from '../../state/myListSlice'
import LibraryButton from '../../components/LibraryButton/LibraryButton'
import MyListButton from '../../components/MyListButton/MyListButton'

function ViewAud() {
    const [audio, setAudio] = useState(null)
    const user = useSelector(state => state.user.user)
    const audLikes = useSelector(state => state.likes.aud_likes)
    const audLibItems = useSelector(state => state.libItems.audLibItems)
    const libAud = useSelector(state => state.myLibrary.libAud)
    const audListItems = useSelector(state => state.listItems.audListItems)
    const listAud = useSelector(state => state.myList.listAud)
    const {id} = useParams()
    const dispatch = useDispatch()
    const type = "aud"
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

    let inList = false;
    let audListItemId = null;
    if (audListItems.length !== 0 && audio !== null){
        audListItems.forEach(listItem =>{
            if(listItem.audio_id === audio.id){
                inList = true
                audListItemId = listItem.id
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

    useEffect(() =>{
        if (audListItems.length === 0 && user !==null){
            console.log("fetching list")
            fetch("/api/aud_list_items")
            .then(r =>{
                if(r.ok){
                    r.json().then(data =>{
                        console.log("list", data)
                        dispatch(setAudListItems(data))
                    })
                }
            })
        }
    }, [user])

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
                    <LibraryButton libType={type} setLibraryState={setLibAud} user={user} inLib={inLib} creationLib={libAud} libItemId={audLibItemId} creation={audio} addLibItemState={addAudLibItem} removeLibItemState={removeAudLibItem} addToLibraryState={addLibAud} removeFromLibraryState={removeLibAud}/>
                    <MyListButton user={user} listType={type} inList={inList} listItemId={audListItemId} creation={audio} creationList={listAud} addListItemState={addAudListItem} removeListItemState={removeAudListItem} setListState={setListAud} addToListState={addListAud} removeFromListState={removeListAud}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <audio controls src={audio.content} style={{"width": "800px"}}>Your browser does not support this audio player</audio>
            </Row>
        </Container>
    )
}

export default ViewAud
