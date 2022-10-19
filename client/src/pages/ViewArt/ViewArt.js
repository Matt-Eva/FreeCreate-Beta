import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../../components/TopNav/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setArtLikes, addArtLike, removeArtLike } from "../../state/likesSlice.js"
import { addLikedArt, removeLikedArt} from "../../state/likedCreationsSlice"
import { setArtLibItems, addArtLibItem, removeArtLibItem } from '../../state/libItemsSlice'
import { setLibArt, addLibArt, removeLibArt } from '../../state/myLibrarySlice'
import { setArtListItems, addArtListItem, removeArtListItem } from '../../state/listItemsSlice'
import { setListArt, addListArt, removeListArt } from '../../state/myListSlice'
import LibraryButton from '../../components/LibraryButton/LibraryButton'
import MyListButton from '../../components/MyListButton/MyListButton'

function ViewArt() {
    const [art, setArt] = useState(null)
    const user = useSelector(state => state.user.user)
    const artLikes = useSelector(state => state.likes.art_likes)
    const artLibItems = useSelector(state => state.libItems.artLibItems)
    const libArt = useSelector(state => state.myLibrary.libArt)
    const artListItems = useSelector(state => state.listItems.artListItems)
    const listArt = useSelector(state => state.myList.listArt)
    const {id} = useParams()
    const dispatch = useDispatch()
    const type = "art"
    console.log("likes", artLikes)
    console.log("library", artLibItems)

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

    let inLib = false;
    let artLibItemId = null;
    if (artLibItems.length !== 0 && art !== null){
        artLibItems.forEach(libItem =>{
            if (libItem.art_id === art.id){
                inLib = true
                artLibItemId = libItem.id
            }
        })
    }

    let inList = false;
    let artListItemId = null;
    if (artListItems.length !== 0 && art !== null){
        artListItems.forEach(listItem =>{
            if(listItem.art_id === art.id){
                inList = true
                artListItemId = listItem.id
            }
        })
    }

    useEffect(()=>{
        fetch(`/api/arts/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then(data =>{
                    setArt(data)
                })
            }
        })
    }, [])

    useEffect(()=>{
        if (artLibItems.length === 0 && user !== null){
            console.log("fetching library")
            fetch("/api/art_lib_items")
            .then(r =>{
                if(r.ok){
                    r.json().then(data =>{
                        console.log("library", data)
                        dispatch(setArtLibItems(data))
                    })
                }
            })
        }
    }, [user])

    useEffect(() => {
        if (artLikes.length === 0 && user !== null){
            console.log("fetching likes")
            fetch("/api/art_likes")
            .then(r => r.json())
            .then(data => {
                console.log("likes", data)
                dispatch(setArtLikes(data))
            })
        }
    }, [user])

    useEffect(() =>{
        if (artListItems.length === 0 && user !==null){
            console.log("fetching list")
            fetch("/api/art_list_items")
            .then(r =>{
                if(r.ok){
                    r.json().then(data =>{
                        console.log("list", data)
                        dispatch(setArtListItems(data))
                    })
                }
            })
        }
    }, [user])

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
            dispatch(addLikedArt(art))
        })
    }

    function dislike(){
        fetch(`/api/art_likes/${artLikeId}`, {method: "DELETE"})
        .then(() =>{
            dispatch(removeArtLike(artLikeId))
            dispatch(removeLikedArt(art.id))
        })
    }

    if (art === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container fluid>
            <Row>
                <TopNav />
            </Row>
            <Row className="justify-content-center text-center">
                <h1>{art.title}</h1>
                <Image src={art.content} style={{"maxWidth": "600px", "maxHeight": "600px"}}/>
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
                    <LibraryButton user={user} libType={type} inLib={inLib} libItemId={artLibItemId} creation={art} creationLib={libArt} addLibItemState={addArtLibItem} removeLibItemState={removeArtLibItem} setLibraryState={setLibArt} addToLibraryState={addLibArt} removeFromLibraryState={removeLibArt}/>
                    <MyListButton user={user} listType={type} inList={inList} listItemId={artListItemId} creation={art} creationList={listArt} addListItemState={addArtListItem} removeListItemState={removeArtListItem} setListState={setListArt} addToListState={addListArt} removeFromListState={removeListArt}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewArt
