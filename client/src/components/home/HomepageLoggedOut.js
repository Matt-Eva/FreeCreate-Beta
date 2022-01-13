import TopNav from "../navigation/TopNav"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"

function HomepageLoggedOut() {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()

    if (user !== null ){
        navigate("/")
    }
    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            
        </Container>
    )
}

export default HomepageLoggedOut
