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
    const creators = useSelector(state => state.creators.creators)
    console.log(creators)


    if (user === null ){
        return <h1>Loading...</h1>
    }

    const creatorCards = creators?.map(creator => <CreatorProfileCard key={creator.id} creator={creator}/>)

    return (
        <Container fluid className="p-0">
            <Row>
                <TopNav />
            </Row>
            <Row>
                {creators.length === 0 ? <div>
                    <p>You haven't yet created any creator profiles</p>
                    <Link to="/newcreator"><Button variant="success">Create a Creator Profile</Button></Link>
                    </div> : null}
                {creatorCards}
            </Row>
        </Container>
    )
}

export default CreatorProfile
