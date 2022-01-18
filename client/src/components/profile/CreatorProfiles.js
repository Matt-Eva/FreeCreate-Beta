import React from 'react'
import {useSelector} from "react-redux"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import TopNav from "../navigation/TopNav"
import CreatorProfileCard from './CreatorProfileCard'


function CreatorProfile() {
    const user = useSelector(state => state.user.user)
    console.log(user)

    if (user === null ){
        return <h1>Loading...</h1>
    }

    const creatorCards = user.creators?.map(creator => <CreatorProfileCard key={creator.id} creator={creator}/>)

    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                {creatorCards}
            </Row>
        </Container>
    )
}

export default CreatorProfile
