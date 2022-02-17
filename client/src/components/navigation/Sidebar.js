import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {setLibDisplayType} from "../../state/libDisplayTypeSlice"

function Sidebar() {
    const libDisplayType = useSelector(state => state.libDisplayType.libDisplayType)
    const dispatch = useDispatch()
    return (
        <Container fluid>
            <Row>
                <h5><Link to="/mycreations">My Creations</Link></h5>
            </Row>
            {/* <Row>
                <h5>Subscriptions</h5>
                <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row> */}
            <Row>
                <h5><Link to='/mylist'>My List</Link></h5>
                <ul style={{"listStyle": "none"}}>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row>
            <Row>
                <h5><Link to="/mylibrary" onClick={() => dispatch(setLibDisplayType("all"))}>My Library</Link></h5>
                <ul style={{"listStyle": "none"}}>
                    <li><Link to="/mylibrary" onClick={() => dispatch(setLibDisplayType("writing"))}>Writing</Link></li>
                    <li><Link to="/mylibrary" onClick={() => dispatch(setLibDisplayType("audio"))}>Audio</Link></li>
                    <li><Link to="/mylibrary" onClick={() => dispatch(setLibDisplayType("art"))}>Art</Link></li>
                    <li><Link to="/mylibrary" onClick={() => dispatch(setLibDisplayType("video"))}>Video</Link></li>
                </ul>
            </Row>
            <Row>
                {/* <h5>Following</h5> */}
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
            </Row>
            <Row>
                <Link to="/likedcreations"><h5>Liked Creations</h5></Link>
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
            </Row>
        </Container>
    )
}

export default Sidebar
