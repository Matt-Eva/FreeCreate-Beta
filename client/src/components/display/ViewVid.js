import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../navigation/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setVidLikes, addVidLike, removeVidLike } from "../../state/likesSlice.js"
import { addLikedVid, removeLikedVid} from "../../state/likedCreationsSlice"
import { setVidLibItems, addVidLibItem, removeVidLibItem } from "../../state/libItemsSlice"
import { setLibVid, addLibVid, removeLibVid } from "../../state/myLibrarySlice"
import { setVidListItems, addVidListItem, removeVidListItem } from '../../state/listItemsSlice'
import { setListVid, addListVid, removeListVid } from '../../state/myListSlice'
import LibraryButton from '../interaction/LibraryButton'
import MyListButton from '../interaction/MyListButton'


function ViewVid() {
    const [video, setVideo] = useState(null)
    const user = useSelector(state => state.user.user)
    const vidLikes = useSelector(state => state.likes.vid_likes)
    const vidLibItems = useSelector(state => state.libItems.vidLibItems)
    const libVid = useSelector(state => state.myLibrary.libVid)
    const vidListItems = useSelector(state => state.listItems.vidListItems)
    const listVid = useSelector(state => state.myList.listVid)
    const dispatch = useDispatch()
    const type = "vid"
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

    let inLib = false;
    let vidLibItemId = null;
    if (vidLibItems.length !== 0 && video !== null){
        vidLibItems.forEach(libItem =>{
            if (libItem.video_id === video.id){
                inLib = true
                vidLibItemId = libItem.id
            }
        })
    }

    let inList = false;
    let vidListItemId = null;
    if (vidListItems.length !== 0 && video !== null){
        vidListItems.forEach(listItem =>{
            if(listItem.video_id === video.id){
                inList = true
                vidListItemId = listItem.id
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

    useEffect(()=>{
        if (vidLibItems.length === 0 && user !== null){
            console.log("fetching library")
            fetch("/api/vid_lib_items")
            .then(r =>{
                if(r.ok){
                    r.json().then(data =>{
                        console.log("library", data)
                        dispatch(setVidLibItems(data))
                    })
                }
            })
        }
    }, [user])

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

    useEffect(() =>{
        if (vidListItems.length === 0 && user !==null){
            console.log("fetching list")
            fetch("/api/vid_list_items")
            .then(r =>{
                if(r.ok){
                    r.json().then(data =>{
                        console.log("list", data)
                        dispatch(setVidListItems(data))
                    })
                }
            })
        }
    }, [user])

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

    if (video === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container fluid>
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
                <Col>
                    <LibraryButton  inLib={inLib} user={user} creation={video} libItemId={vidLibItemId} libType={type} creationLib={libVid} addLibItemState={addVidLibItem} removeLibItemState={removeVidLibItem} setLibraryState={setLibVid} addToLibraryState={addLibVid} removeFromLibraryState={removeLibVid}/>
                    <MyListButton user={user} listType={type} inList={inList} listItemId={vidListItemId} creation={video} creationList={listVid} addListItemState={addVidListItem} removeListItemState={removeVidListItem} setListState={setListVid} addToListState={addListVid} removeFromListState={removeListVid}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewVid
