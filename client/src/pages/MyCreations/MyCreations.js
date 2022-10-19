import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TopNav from '../../components/TopNav/TopNav'
import Sidebar from '../../components/Sidebar/Sidebar'
import {useSelector, useDispatch} from "react-redux"
import DisplayAllContainer from '../../components/DisplayAllContainer/DisplayAllContainer'
import DisplayTypeContainer from '../../components/DisplayTypeContainer/DisplayTypeContainer'
import MyCreationsDisplayAllContainer from '../../components/MyCreationsDisplayAllContainer/MyCreationsDisplayAllContainer'
import PersonalSearch from '../../components/PersonalSearch/PersonalSearch'

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
        <Container fluid >
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col xs={2}>
                    <Sidebar />
                </Col>
                <Col xs={5} sm={10}>
                    <Row>
                        <Col  className="text-center">
                            <h1>My Creations</h1>
                            <select onChange={(e) => setCreatorId(e.target.value)}>
                                <option value="">Select Creator Profile</option>
                                {creatorOptions}
                            </select>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <MyCreationsDisplayAllContainer writing={writing} audio={audio} video={video} art={art} />
                    </Row>
                    
                    <PersonalSearch />
                    
                </Col>
            </Row>
           
        </Container>
    )
}

export default MyCreations
