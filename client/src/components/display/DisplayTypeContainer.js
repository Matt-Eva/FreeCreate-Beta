import DisplayCard from "./DisplayCard";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

function DisplayTypeContainer({display, displayType}) {
    const displayCards = display?.map(creation => <DisplayCard key={creation.id} creation={creation} displayType={displayType}/>)
    return (
        <Container>
            <Row>
            {displayCards}
            </Row>
        </Container>
    )
}

export default DisplayTypeContainer;