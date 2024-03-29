import DisplayCard from "../DisplayCard/DisplayCard";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

function DisplayTypeContainer({display, displayType}) {
    const displayCards = display?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={displayType}/>)
    return (
        <Container>
            <Row className="d-flex justify-content-center flex-wrap">
            {displayCards}
                {/* <Col className="d-flex justify-content-center flex-wrap">
                    {displayCards}
                </Col> */}
            </Row>
        </Container>
    )
}

export default DisplayTypeContainer;