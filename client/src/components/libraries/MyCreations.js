import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TopNav from '../navigation/TopNav'
import Sidebar from '../navigation/Sidebar'
import {useSelector, useDispatch} from "react-redux"
import DisplayAllContainer from '../display/DisplayAllContainer'
import DisplayTypeContainer from '../display/DisplayTypeContainer'
import MyCreationsDisplayAllContainer from '../display/MyCreationsDisplayAllContainer'
import PersonalSearch from '../navigation/PersonalSearch'

function MyCreations() {
    const user = useSelector(state => state.user.user)
    const creators = useSelector(state => state.creators.creators)
    const [creatorId, setCreatorId] = useState("")
    const [writing, setWriting] = useState([])
    const [audio, setAudio] = useState([])
    const [video, setVideo] = useState([])
    const [art, setArt] = useState([])

   

    const creatorOptions = creators?.map(creator => <option key={creator.id} value={creator.id}>{creator.name}</option>)

    useEffect(() => {
        if (creatorId !== ""){
            fetch(`/api/mycreations/${creatorId}`)
            .then(r => {
                if (r.ok){
                    r.json().then(data => {
                        console.log(data)
                        setArt(data.arts)
                        setWriting(data.writings)
                        setVideo(data.videos)
                        setAudio(data.audios)
                    })
                }else{
                    r.json().then(data =>{
                        console.log(data)
                    })
                }
            })
        }
    }, [creatorId])

    return (
        <Container style={{"margin": "0px"}}>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <Sidebar />
                </Col>
                <Col xs={10} sm={10}>
                    <h1>My Creations</h1>
                    <select onChange={(e) => setCreatorId(e.target.value)}>
                        <option value="">Select Creator Profile</option>
                        {creatorOptions}
                    </select>
                    <PersonalSearch />
                    <MyCreationsDisplayAllContainer writing={writing} audio={audio} video={video} art={art} />
                </Col>
            </Row>
           
        </Container>
    )
}

export default MyCreations
