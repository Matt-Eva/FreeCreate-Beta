import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <Container>
            <Row>
                <h2><Link to="/mycreations">My Creations</Link></h2>
                <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row>
            <Row>
                <h2>Subscriptions</h2>
                <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row>
            <Row>
                <h2>My List</h2>
                <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row>
            <Row>
                <h2>My Library</h2>
                <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row>
            <Row>
                <h2>Following</h2>
                <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row>
            <Row>
                <h2>Liked Creations</h2>
                <ul>
                    <li>Writing</li>
                    <li>Audio</li>
                    <li>Art</li>
                    <li>Video</li>
                </ul>
            </Row>
        </Container>
    )
}

export default Sidebar
