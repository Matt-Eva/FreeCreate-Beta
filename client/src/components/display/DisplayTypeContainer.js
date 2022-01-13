import DisplayCard from "./DisplayCard";
import Container from "react-bootstrap/Container"

function DisplayTypeContainer({display}) {
    const displayCards = display?.map(creation => <DisplayCard key={creation.id} creation={creation}/>)
    return (
        <Container>
            {displayCards}
        </Container>
    )
}

export default DisplayTypeContainer;