import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import DisplayCard from "./DisplayCard"

function DisplayAllContainer({writing, audio, art, video}) {
    const writDisplayCards = writing?.map(creation => <DisplayCard key={creation.id} creation={creation}/>)
    const audDisplayCards = writing?.map(creation => <DisplayCard key={creation.id} creation={creation}/>)
    const artDisplayCards = writing?.map(creation => <DisplayCard key={creation.id} creation={creation}/>)
    const vidDisplayCards = writing?.map(creation => <DisplayCard key={creation.id} creation={creation}/>)
    return (
        <Container>
            <Col>
            </Col>
            <Col>
            </Col>
            <Col>
            </Col>
            <Col>
            </Col>
        </Container>
    )
}

export default DisplayAllContainer
