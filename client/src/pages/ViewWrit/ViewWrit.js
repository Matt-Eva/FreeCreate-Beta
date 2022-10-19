import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import TopNav from '../../components/TopNav/TopNav'
import {useSelector, useDispatch} from "react-redux"
import { setWritLikes, addWritLike, removeWritLike } from "../../state/likesSlice.js"
import { addLikedWrit, removeLikedWrit} from "../../state/likedCreationsSlice"
import { setWritLibItems, addWritLibItem, removeWritLibItem } from "../../state/libItemsSlice"
import { setLibWrit, addLibWrit, removeLibWrit } from '../../state/myLibrarySlice'
import { setWritListItems, addWritListItem, removeWritListItem } from '../../state/listItemsSlice'
import { setListWrit, addListWrit, removeListWrit } from '../../state/myListSlice'
import LibraryButton from '../../components/LibraryButton/LibraryButton'
import MyListButton from '../../components/MyListButton/MyListButton'

function ViewWrit() {
    const [writing, setWriting] = useState(null)
    const user = useSelector(state => state.user.user)
    const writLikes = useSelector(state => state.likes.writ_likes)
    const writLibItems = useSelector(state => state.libItems.writLibItems)
    const libWrit = useSelector(state => state.myLibrary.libWrit)
    const writListItems = useSelector(state => state.listItems.writListItems)
    const listWrit = useSelector(state => state.myList.listWrit)
    const dispatch = useDispatch()
    const libType="writ"
    const listType="writ"
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

    let inLib = false;
    let writLibItemId = null;
   
    if (writLibItems.length !== 0 && writing !== null){
        writLibItems.forEach(libItem =>{
            if (libItem.writing_id === writing.id){
                inLib = true
                writLibItemId = libItem.id
            }
        })
    }

    let inList = false;
    let writListItemId = null;
    if (writListItems.length !== 0 && writing !== null){
        writListItems.forEach(listItem =>{
            if(listItem.writing_id === writing.id){
                inList = true
                writListItemId = listItem.id
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

    useEffect(()=>{
        if (writLibItems.length === 0 && user !== null){
            console.log("fetching library")
            fetch("/api/writ_lib_items")
            .then(r =>{
                if(r.ok){
                    r.json().then(data =>{
                        console.log("library", data)
                        dispatch(setWritLibItems(data))
                    })
                }
            })
        }
    }, [user])

    useEffect(() =>{
        if (writListItems.length === 0 && user !==null){
            console.log("fetching list")
            fetch("/api/writ_list_items")
            .then(r =>{
                if(r.ok){
                    r.json().then(data =>{
                        console.log("list", data)
                        dispatch(setWritListItems(data))
                    })
                }
            })
        }
    }, [user])

    useEffect(() => {
        if (writLikes.length === 0 && user !== null){
            fetch("/api/writ_likes")
            .then(r => r.json())
            .then(data => {
                console.log(data)
                dispatch(setWritLikes(data))
            })
        }
    }, [user])

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

    if (writing === null){
        return <h1>Loading...</h1>
    }

    return (
        <Container fluid>
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
                <Col>
                    <LibraryButton user={user} libType={libType} inLib={inLib} libItemId={writLibItemId} creation={writing} creationLib={libWrit} addLibItemState={addWritLibItem} removeLibItemState={removeWritLibItem} setLibraryState={setLibWrit} addToLibraryState={addLibWrit} removeFromLibraryState={removeLibWrit}/>
                    <MyListButton user={user} listType={listType} inList={inList} listItemId={writListItemId} creation={writing} creationList={listWrit} addListItemState={addWritListItem} removeListItemState={removeWritListItem} setListState={setListWrit} addToListState={addListWrit} removeFromListState={removeListWrit}/>
                </Col>
            </Row>
            <Row className="justify-content-center text-center">
                <h1>{writing.title}</h1>
                <p>{writing.content}</p>
            </Row>
        </Container>
    )
}

export default ViewWrit
