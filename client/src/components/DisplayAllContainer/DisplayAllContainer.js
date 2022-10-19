import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import DisplayCard from "../DisplayCard/DisplayCard"

function DisplayAllContainer({writing, audio, art, video}) {

    const writDisplayCards = writing?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"writing"}/>)
    const audDisplayCards = audio?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"audio"}/>)
    const artDisplayCards = art?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"art"}/>)
    const vidDisplayCards = video?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"video"}/>)
    
    return (
        <Container fluid>
            <Row xs ={4} sm={4} md={4} lg={4}>
                <Col className="d-flex justify-content-center flex-wrap border-end border-dark">
                    {writDisplayCards}
                </Col>
                <Col className="d-flex justify-content-center flex-wrap border-end border-dark">
                    {audDisplayCards}
                </Col>
                <Col className="d-flex justify-content-center flex-wrap border-end border-dark">
                    {artDisplayCards}
                </Col>
                <Col className="d-flex justify-content-center flex-wrap">
                    {vidDisplayCards}
                </Col>
            </Row>
        </Container>
    )
}

export default DisplayAllContainer
