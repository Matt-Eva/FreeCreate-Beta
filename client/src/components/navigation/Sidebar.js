import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <Container>
            <Row>
                <h5><Link to="/mycreations">My Creations</Link></h5>
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
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
                {/* <h5>My List</h5> */}
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
            </Row>
            <Row>
                <h5><Link to="/mylibrary">My Library</Link></h5>
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
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
