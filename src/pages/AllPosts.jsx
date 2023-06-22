import { useContext, useEffect, useState } from "react";
import {Container, Row, Col, NavDropdown, Nav} from "react-bootstrap";
import CardPost from "../components/CardPost";
import Context from "../Contex";
import Utils from "../Utils";

const AllPosts = () => {
    const {searchResult, posts, userId, baseData} = useContext(Context);
    const {filterPost, getUniqueTags, getUniqueAuthors} = useContext(Utils);
    const [filterPosts, setFilterPosts] = useState([])
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    console.log(tags)
    useEffect(() => {
        setAuthors(getUniqueAuthors(baseData));
        setTags(getUniqueTags(baseData));
        setFilterPosts(baseData);
    }, [])
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
    <Col sm={12}>
    <Nav className="justify-content-end flex-grow-1 pe-3">
    {tags.length > 0 && <> 
        <NavDropdown title="Фильтр по тегам" id="navbarScrollingDropdown">
            {tags.map(el => <NavDropdown.Item 
            onClick={() => setFilterPosts(filterPost(posts).byTag(el).data)}>
                {el}
                </NavDropdown.Item>
                )}
            </NavDropdown>
    </>}
        {authors.length > 0 && <>
            <NavDropdown title="Фильтр по автору" id="navbarScrollingDropdown">
                {authors.map(el => <NavDropdown.Item  
                onClick={() => setFilterPosts(filterPost(baseData).byAuthor(el).data)}>
                    {el}
                </NavDropdown.Item>
                    )}
            </NavDropdown>
        </>}
        </Nav>
    </Col>
    </Row>
    <Row>
    <Col sm={12}>
    <Row className="justify-content-center align-self-center">
        {filterPosts.map((pro, i) => (
    <CardPost key={i} image={pro.image} {...pro} 
    id={pro._id}/>))}
    </Row>
    </Col>
    </Row>
    </Container>
    
    </>
}

export default AllPosts;