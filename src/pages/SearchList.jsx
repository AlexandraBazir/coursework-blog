import { useContext } from "react";
import {Container, Row, Col} from "react-bootstrap";
import CardPost from "../components/CardPost";
import Context from "../Contex";


const SearchList = () => {
    const {searchResult, posts} = useContext(Context);
    return <> <Container style={{marginTop: "30px"}}>
<Row>
{searchResult && <Col md={{ span: 11, offset: 1 }} style={{marginBottom: "10px"}}>
            {searchResult}
            </Col>}
            <Col md={{ span: 11, offset: 1 }}>
    </Col>
    </Row>
    <Row>
    <Col sm={12}>
    <Row className="justify-content-center align-self-center">
        {posts.map((pro, i) => (
    <CardPost key={i} image={pro.image} {...pro} 
    id={pro._id}/>))}
    </Row>
    </Col>
    </Row>
    </Container>
    
    </>
}

export default SearchList;