import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/col'
import TopNav from '../navigation/TopNav'
import Sidebar from '../navigation/Sidebar'
import {useSelector, useDispatch} from "react-redux"
import DisplayAllContainer from '../display/DisplayAllContainer'
import PersonalSearch from '../navigation/PersonalSearch'

function MyCreations() {
    const user = useSelector(state => state.user.user)
    const creator = useState(null)
    const writings = useState([])
    const audios = useState([])



    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <Sidebar />
                </Col>
                <Col>
                    <h1>My Creations</h1>
                    <PersonalSearch />
                    <DisplayAllContainer />
                </Col>
            </Row>
           
        </Container>
    )
}

export default MyCreations
