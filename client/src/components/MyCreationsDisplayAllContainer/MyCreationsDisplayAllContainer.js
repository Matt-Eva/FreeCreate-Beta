import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import MyCreationDisplayCard from "../MyCreationDisplayCard/MyCreationDisplayCard"

function MyCreationsDisplayAllContainer({writing, audio, art, video}) {
    // console.log(writing, audio, art, video)
    const writDisplayCards = writing?.map(creation => <MyCreationDisplayCard key={creation.id} creation={creation} displayType={"writing"}/>)
    const audDisplayCards = audio?.map(creation => <MyCreationDisplayCard key={creation.id} creation={creation} displayType={"audio"}/>)
    const artDisplayCards = art?.map(creation => <MyCreationDisplayCard key={creation.id} creation={creation} displayType={"art"}/>)
    const vidDisplayCards = video?.map(creation => <MyCreationDisplayCard key={creation.id} creation={creation} displayType={"video"}/>)
   
    return (
        <Container fluid>
            <Row xs ={4} sm={4} md={4} lg={4}>
                <Col style={{"borderRight" : "solid", "borderWidth": "1px"}}>
                    {writDisplayCards === undefined || writDisplayCards.length === 0 ? <p>No writing to display</p> : writDisplayCards}
                </Col>
                <Col style={{"borderRight" : "solid", "borderWidth": "1px"}}>
                    {audDisplayCards === undefined || audDisplayCards.length === 0 ? <p>No audio to display</p> : audDisplayCards}
                </Col>
                <Col style={{"borderRight" : "solid", "borderWidth": "1px"}}>
                    {artDisplayCards === undefined || artDisplayCards.length === 0 ? <p>No art to display</p> : artDisplayCards}
                </Col>
                <Col>
                    {vidDisplayCards === undefined || vidDisplayCards.length === 0 ? <p>No videos to display</p> : vidDisplayCards}
                </Col>
            </Row>
        </Container>
    )
}

export default MyCreationsDisplayAllContainer;
