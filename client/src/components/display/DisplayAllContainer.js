import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import DisplayCard from "./DisplayCard"

function DisplayAllContainer({writing, audio, art, video}) {
    // console.log(writing, audio, art, video)
    const writDisplayCards = writing?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"writing"}/>)
    const audDisplayCards = audio?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"audio"}/>)
    const artDisplayCards = art?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"art"}/>)
    const vidDisplayCards = video?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"video"}/>)
    return (
        <Container>
            <Row>
            <Col style={{"borderRight" : "solid", "borderWidth": "1px"}}>
                {writDisplayCards}
            </Col>
            <Col style={{"borderRight" : "solid", "borderWidth": "1px"}}>
             {audDisplayCards}
            </Col>
            <Col style={{"borderRight" : "solid", "borderWidth": "1px"}}>
            {artDisplayCards}
            </Col>
            <Col>
            {vidDisplayCards}
            </Col>
            </Row>
        </Container>
    )
}

export default DisplayAllContainer
