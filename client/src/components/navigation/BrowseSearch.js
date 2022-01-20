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
        if (displayType === "writing"){
            fetch("/api/search/writings", configObj)
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setQueryDisplayWriting(data))
                setSearch("")
            })
        }
    }

    function filterQuery(e){
        e.preventDefault()
        setSearch("")
        const filterObj ={
            tag: tag
        }
        const configObj ={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(filterObj)
        }
        if (displayType === "writing"){
            fetch("/api/filter/writings", configObj)
            .then(r => r.json())
            .then(data =>{
                console.log(data)
                dispatch(setQueryDisplayWriting(data))
            })
        }
    }

    return (
        <Container style={{"borderBottom": "solid", "borderWidth": "1px", "margin": "0px 0px 10px 0px", "paddingBottom": "10px"}}>
            <Row>
                <Form onChange={(e) => setSearch(e.target.value)} onSubmit={searchQuery}>
                    <Form.Group>
                        <Form.Control type="text" placeholder={`Search ${displayType} by name...`} value={search}/>
                        <Button variant="success">Search</Button>
                    </Form.Group>
                </Form>
                <Form onChange={(e) => setTag(e.target.value)} onSubmit={filterQuery}>
                    <Form.Group>
                        <Form.Control type="text" placeholder={`Filter ${displayType} by tag...`}/>
                        <Button variant="success">Filter</Button>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    )
}

export default BrowseSearch
