import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <Container>
            <Row>
                <h4><Link to="/mycreations">My Creations</Link></h4>
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
            </Row>
            {/* <Row>
                <h4>Subscriptions</h4>
                <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row> */}
            <Row>
                <h4>My List</h4>
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
            </Row>
            <Row>
                <h4>My Library</h4>
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
            </Row>
            <Row>
                {/* <h4>Following</h4> */}
                {/* <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul> */}
            </Row>
            <Row>
                <h4>Liked Creations</h4>
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
