import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import DisplayCard from "./DisplayCard"

function DisplayAllContainer({writing, audio, art, video}) {

    const writDisplayCards = writing?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"writing"}/>)
    const audDisplayCards = audio?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"audio"}/>)
    const artDisplayCards = art?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"art"}/>)
    const vidDisplayCards = video?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={"video"}/>)
    
    return (
        <Container style={{"margin": "0px"}} >
            <Row >
                <Col >
                    {writDisplayCards}
                </Col>
                <Col >
                    {audDisplayCards}
                </Col>
                <Col >
                    {artDisplayCards}
                </Col>
                <Col >
                    {vidDisplayCards}
                </Col>
            </Row>
        </Container>
    )
}

export default DisplayAllContainer
