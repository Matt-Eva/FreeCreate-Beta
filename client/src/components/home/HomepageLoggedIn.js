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
    const queryDisplayWriting = useSelector(state => state.queryDisplay.queryDisplayWriting)
    const queryDisplayAudio = useSelector(state => state.queryDisplay.queryDisplayAudio)
    const queryDisplayArt = useSelector(state => state.queryDisplay.queryDisplayArt)
    const queryDisplayVideo = useSelector(state => state.queryDisplay.queryDisplayVideo)

    let singleTypeDisplay = []
    if (displayType === "writing"){
        singleTypeDisplay = queryDisplayWriting
    } else if (displayType === "audio"){
        singleTypeDisplay = queryDisplayAudio
    } else if (displayType === "art"){
        singleTypeDisplay = queryDisplayArt
    }  else if (displayType === "video"){
        singleTypeDisplay = queryDisplayVideo
    }

    if (user === null){
        return(<h1>Loading...</h1>)
      }

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
                    <Row>
                        <BrowseSearch />
                    </Row>
                    <Row>
                        {displayType === "all" ? <DisplayAllContainer writing={queryDisplayWriting} audio={queryDisplayAudio} art={queryDisplayArt} video={queryDisplayVideo} /> : <DisplayTypeContainer display={singleTypeDisplay} />}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default HomepageLoggedIn
