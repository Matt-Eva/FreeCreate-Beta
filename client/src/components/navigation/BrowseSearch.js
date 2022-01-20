import {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
import { useDispatch } from "react-redux"
import { setQueryDisplayWriting, setQueryDisplayAudio, setQueryDisplayArt, setQueryDisplayVideo, setQueryDisplayAll } from "../display/queryDisplaySlice"

function BrowseSearch({displayType}) {
    const [search, setSearch] = useState("")
    const [tag, setTag] = useState("")
    const dispatch = useDispatch()
    
    function searchQuery(e){
        e.preventDefault()
        const searchObj ={
            search: search
        }
        const configObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(searchObj)
        }
        if (displayType ==="all"){
            fetch("/allcreations/search", configObj)
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                setSearch("")
                dispatch(setQueryDisplayWriting(data.writing))
                dispatch(setQueryDisplayAudio(data.audio))
                dispatch(setQueryDisplayArt(data.art))
                dispatch(setQueryDisplayVideo(data.video))
            })
        } else if (displayType === "writing"){
            fetch("/api/search/writings", configObj)
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setQueryDisplayWriting(data))
                setSearch("")
            })
        } else if(displayType === "audio"){
            fetch("/api/search/audios", configObj)
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setQueryDisplayAudio(data))
                setSearch("")
            })
        } else if(displayType === "art"){
            fetch("/api/search/arts", configObj)
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setQueryDisplayArt(data))
                setSearch("")
            })
        } else if(displayType === "video"){
            fetch("/api/search/videos", configObj)
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setQueryDisplayVideo(data))
                setSearch("")
            })
        }
    }

    function filterQuery(e){
        e.preventDefault()
        if (tag === "")
        setSearch("")
        const filterObj ={
            tag: tag
        }
        const configObj ={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(filterObj)
        }
        if (displayType === "all"){
            fetch("/allcreations/filter", configObj)
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                setTag("")
                dispatch(setQueryDisplayWriting(data.writing))
                dispatch(setQueryDisplayAudio(data.audio))
                dispatch(setQueryDisplayArt(data.art))
                dispatch(setQueryDisplayVideo(data.video))
            })
        } else if (displayType === "writing"){
            fetch("/api/filter/writings", configObj)
            .then(r => {
                if (r.ok){
                    r.json().then(data =>{
                        console.log(data)
                        setTag("")
                        dispatch(setQueryDisplayWriting(data))
                    })
                }else{
                    r.json().then(data =>{
                        alert(data.message)
                    })
                }
            })
        } else if (displayType === "audio"){
            fetch("/api/filter/audios", configObj)
            .then(r => {
                if (r.ok){
                    r.json().then(data =>{
                        console.log(data)
                        setTag("")
                        dispatch(setQueryDisplayAudio(data))
                    })
                }else{
                    r.json().then(data =>{
                        alert(data.message)
                    })
                }
            })
        } else if (displayType === "art"){
            fetch("/api/filter/arts", configObj)
            .then(r => {
                if (r.ok){
                    r.json().then(data =>{
                        console.log(data)
                        setTag("")
                        dispatch(setQueryDisplayArt(data))
                    })
                }else{
                    r.json().then(data =>{
                        alert(data.message)
                    })
                }
            })
        } else if (displayType === "video"){
            fetch("/api/filter/videos", configObj)
            .then(r => {
                if (r.ok){
                    r.json().then(data =>{
                        console.log(data)
                        setTag("")
                        dispatch(setQueryDisplayVideo(data))
                    })
                }else{
                    r.json().then(data =>{
                        alert(data.message)
                    })
                }
            })
        }
    }

    return (
        <Container style={{"borderBottom": "solid", "borderWidth": "1px", "margin": "0px 0px 10px 0px", "paddingBottom": "10px"}}>
            <Row>
                <Form onChange={(e) => setSearch(e.target.value)} onSubmit={searchQuery}>
                    <Form.Group>
                        <Form.Control type="text" placeholder={`Search ${displayType} by name...`} value={search}/>
                        <Button variant="success" type="submit">Search</Button>
                    </Form.Group>
                </Form>
                <Form onChange={(e) => setTag(e.target.value)} onSubmit={filterQuery}>
                    <Form.Group>
                        <Form.Control type="text" placeholder={`Filter ${displayType} by tag...`} value={tag}/>
                        <Button variant="success" type="submit">Filter</Button>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    )
}

export default BrowseSearch
