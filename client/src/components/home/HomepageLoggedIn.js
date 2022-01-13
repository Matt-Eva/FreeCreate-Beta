import { Container, Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"
import TopNav from "../navigation/TopNav"
import Sidebar from "../navigation/Sidebar"
import BrowseSearch from "../navigation/BrowseSearch"
import DisplayAllContainer from "../display/DisplayAllContainer"
import DisplayTypeContainer from "../display/DisplayTypeContainer"

function HomepageLoggedIn() {
    const user = useSelector(state => state.user.user)
    const displayType = useSelector(state => state.displayType.displayType)
    return (
        <Container>
            <Row>
                <TopNav />
            </Row>
            <Row>
                {user ? <Col>
                    <Sidebar />
                </Col> : null}
                <Col>
                    <Row>
                        <BrowseSearch />
                    </Row>
                    <Row>
                        {displayType === "all" ? <DisplayAllContainer /> : <DisplayTypeContainer />}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default HomepageLoggedIn
