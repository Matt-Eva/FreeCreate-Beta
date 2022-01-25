import React from 'react'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TopNav from '../navigation/TopNav'
import Sidebar from "../navigation/Sidebar"

function LikedCreations() {
    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Sidebar/>
            </Row>
        </Container>
    )
}

export default LikedCreations
