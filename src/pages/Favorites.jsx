import { useContext } from "react";
import Context from "../Contex";
import CardPost from "../components/CardPost";
import { Container, Row, Col } from "react-bootstrap";

const Favorites = () => {
    const { userId, baseData } = useContext(Context);
    return <> <Container style={{marginTop: "30px"}}>
        <Row>
        <Col md={{ span: 11, offset: 1 }} style={{marginBottom: "10px"}}>
        <h1>Любимые посты</h1>
        </Col>
        </Row>
        <Row>
        <Col sm={12}>
            <Row className="justify-content-center align-self-center">
        {baseData.filter(el => el.likes.includes(userId)).map((pro) => (
                <CardPost key={pro._id} 
                title={pro.title}
          image={pro.image}
          text={pro.text}
          id={pro._id}
          author={pro.author}
          likes={pro.likes}
                />
            ))}
            </Row>
        </Col>
        </Row>
    </Container>
    </>
}

export default Favorites;