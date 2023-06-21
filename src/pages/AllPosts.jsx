import { useContext, useEffect, useState } from "react";
import {Container, Row, Col} from "react-bootstrap";
import CardPost from "../components/CardPost";
import Context from "../Contex";
import Utils from "../Utils";

const AllPosts = () => {
    const {searchResult, posts, userId} = useContext(Context);
    const {filterPost, getUniqueTags, getUniqueAuthors} = useContext(Utils);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        setAuthors(getUniqueAuthors(posts));
        setTags(getUniqueTags(posts))
    }, [posts])
    return <> <Container>
<Row>
{searchResult && <Col className="search-result">
            {searchResult}
            </Col>}
            <Col sm={12}><h1 style={{margin: 0, gridColumnEnd: "span 3"}}>
                Все посты</h1>
    </Col>
    </Row>
    <Row>
    <Col sm={4}>
    {tags.length > 0 && <>
        <h4>Фильтр по тегам</h4>
        <ul>
            {tags.map(el => <li key={el}>{el}</li>)}
        </ul>
    </>}

    </Col>
    <Col sm={8}>
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

export default AllPosts;