import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button, Form, FormGroup, FormLabel, FormControl, Modal } from "react-bootstrap";
import { Trash3, PencilFill } from "react-bootstrap-icons";
import UpdPostForm from "../components/UpdPostForm";
import Context from "../Contex";


const Post = () => {
    const {token, baseData} = useContext(Context);
    const { id } = useParams();
    const [data, setData] = useState({});
    const [allComments, setAllComments] = useState([]);
    const [comment, setComment] = useState([]);
    const [hideForm, setHideForm] = useState(true);
    const [modalUpdPost, setModalUpdPost] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [image, setImage] = useState(data.image);
    const [text, setText] = useState(data.text);
    const [tags, setTags] = useState(data.tags);
    const handleClose = () => setModalUpdPost(false);
    const addComment = (e) => {
        e.preventDefault();
        const body = {
            text: comment
        }
            fetch(`https://api.react-learning.ru/v2/group-12/posts/comments/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(d => {
                    setData(d);
                    setComment("");
                    setHideForm(true);
                })
    }
    const delComment = (c_id) => {
        fetch(`https://api.react-learning.ru/v2/group-12/posts/comments/${id}/${c_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(d => {
                setData(d);
            })
    }
    const updPost = () => {
        let body = {
            title: title,
            image: image,
            text: text,
            tags: tags
        };
        fetch(`https://api.react-learning.ru/v2/group-12/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(d => {
                setData(d);
                setModalUpdPost(false);
            })
    } 
   
    useEffect(() => {
        fetch(`https://api.react-learning.ru/v2/group-12/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(serverData => {
                setData(serverData);
            })
    }, [id, token])
    useEffect(() => {
        fetch(`https://api.react-learning.ru/v2/group-12/posts/comments/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(serData => {
                setAllComments(serData);
                
            })
    }, [token, id, data])
    return <>
    <Container>
        <Row style={{marginTop: "2rem"}}>
            <Col sm={8}>
            <Image src={data.image} alt={data.title} fluid /> 
            <span style={{cursor: "pointer"}}><PencilFill 
            onClick={() => setModalUpdPost(true)}/></span>
            <h1>{data.title}</h1>
            <p>{data.text}</p>
            <span>{data.tags}</span>
            </Col>
            {baseData.filter(el => el._id === data._id).map(
                (e, i) => <Col key={i} sm={4}>
                <Image src={e.author.avatar} alt={e.author.name} style={{maxHeight: "6rem"}} rounded />
                <p>Автор статьи: <br/> {e.author.name}</p>
              <p>Опубликовано: {new Date(e.created_at).toLocaleDateString()}</p>
                  <p>Обновлено: {new Date(e.updated_at).toLocaleDateString()}</p>
                <p>Понравилось: {e.likes.length}</p>
                </Col>
                )
            }
        </Row>
        <h2>Комментарии</h2>
        {allComments.length > 0
                ?  <div>{allComments.map(el => <Row>
                    <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><Col><span style={{verticalAlign: "center"}}>
                            <Image src={el.author.avatar} alt={el.author.name} style={{maxHeight: "1.5rem", margin: "0.5rem"}} rounded/>
                               {el.author.name} {new Date(el.created_at).toLocaleDateString()}</span>
                                </Col>
                                </Card.Title>
                            <Card.Text>{el.text}
                            <span>
                                <Trash3 onClick={() => delComment(el._id)} style={{cursor: "pointer"}}/>
                            </span>
                            </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>
                )}</div>
            : <p>Еще никто не прокомментировал...</p>
        }
    <Row>
        {hideForm && <Button onClick={() => setHideForm(false)}>Оставить комментарий</Button>}
        {!hideForm && <Col>
        <Form onSubmit={addComment}>
            <FormGroup>
                <FormLabel htmlFor="text">
                Комментарий:
                </FormLabel>
                <FormControl as="textarea" type="text" id="text" value={comment}
                onChange={(e) => setComment(e.target.value)}
                />
            </FormGroup>
            <Button type="submit">
            Добавить
            </Button>
        </Form>
        </Col>
        }
    </Row>
    </Container>
    <Modal show={modalUpdPost} onHide={handleClose} animation={false}>
    <Modal.Header closeButton>
    <Modal.Title>Редактирование поста</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <div>
<UpdPostForm 
        val={title}
        data={data.title}
        setTitle={setTitle}
        setData={setData}
        setModalUpdPost={setModalUpdPost}
        modalUpdPost={modalUpdPost}
        name="title"
        updPost={updPost}
        />
        </div>
<div><UpdPostForm 
        data={data.text}
        val={text}
        setData={setData}
        setText={setText}
        setModalUpdPost={setModalUpdPost}
        modalUpdPost={modalUpdPost} 
        name="text"
        updPost={updPost}
        />
        </div>
        <div><UpdPostForm 
        data={data.image}
        val={image}
        setImage={setImage}
        setData={setData}
        setModalUpdPost={setModalUpdPost}
        modalUpdPost={modalUpdPost} 
        name="image"
        updPost={updPost}
        />
        </div>
        <div><UpdPostForm 
        data={data.tags}
        val={tags}
        setTags={setTags}
        setData={setData}
        setModalUpdPost={setModalUpdPost}
        modalUpdPost={modalUpdPost} 
        name="tags"
        updPost={updPost}
        />
        </div>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="outline-success" type="submit" onClick={updPost}>
            Сохранить изменения
        </Button>
        </Modal.Footer>
        </Modal>
    </>
}

export default Post;