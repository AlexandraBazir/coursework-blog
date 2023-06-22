import { useContext } from "react";
import Context from "../Contex";
import CardPost from "../components/CardPost";
import { Container, Row, Col } from "react-bootstrap";

const Favorites = () => {
    const { userId, baseData, token } = useContext(Context);
    return <> <Container>
        <Row>
        <h1>Любимые посты</h1>
        <Col>
        {baseData.filter(el => el.likes.includes(userId)).map((pro, i) => (
                <CardPost key={i} 
                title={pro.title}
          image={pro.image}
          text={pro.text}
          id={pro._id}
          author={pro.author}
          likes={pro.likes}
                />
            ))}
        </Col>
        </Row>

    </Container>
    </>
}

export default Favorites;