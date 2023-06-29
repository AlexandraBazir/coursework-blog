import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button, Form, FormGroup, FormLabel, 
    FormControl, Modal, Figure, ButtonGroup, Badge } from "react-bootstrap";
import { Trash3, PencilFill, HandThumbsUp } from "react-bootstrap-icons";
import UpdPostForm from "../components/UpdPostForm";
import Context from "../Contex";


const Post = () => {
    const {token, baseData, setBaseData, userId} = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
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
    const delPost = () => {
        fetch(`https://api.react-learning.ru/v2/group-12/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then(res => res.json())
          .then(d => {
            setBaseData(prev => prev.filter(el => el._id !== id));
            navigate("/");
          })
      }
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
    <Container style={{ marginTop: "30px", maxHeight: "100%" }}>
        <Row style={{marginTop: "2rem"}}>
            <Col sm={8}>
            <Image src={data.image} alt={data.title}  
            style={{ maxWidth: "350px", objectFit: "cover"}}  /> 
            <h1 style={{margin: "10px 0"}}>{data.title}</h1>
            <p>{data.text}</p>
            {/* <div>
                {(data.tags).map(el => <Badge key={el} style={{margin: "5px"}}>{el}</Badge>)}
            </div> */}

            <>
    
           <Badge bg="light" 
            text="dark" style={{marginBottom: "10px"}}>
                {data.tags}
                </Badge>
           </>
            </Col>
            {baseData.filter(el => el._id === data._id).map(
                (e) => <Col key={e._id} sm={4}>
                    <Figure style={{margin: 0}}>
                    <Figure.Image 
                    src={e.author.avatar} 
                    alt={e.author.name} 
                    style={{maxHeight: "100px", objectFit: "cover"}} 
                    roundedCircle/>
                    <Figure.Caption>
                    <p style={{marginBottom: "0.5rem"}}>Автор статьи: <br/> {e.author.name}</p>
                    <p style={{marginBottom: "0.5rem"}}>Опубликовано: {new Date(e.created_at).toLocaleDateString()}</p>
                  <p style={{marginBottom: "0.5rem"}}>Обновлено: {new Date(e.updated_at).toLocaleDateString()}</p>
                    </Figure.Caption>
                    </Figure>
                <Image/>
                <div style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.2rem"
            }}>
                {e.likes.length !== 0 && <>
                <HandThumbsUp/> <div style={{ verticalAlign: "center", marginLeft: "4px" }}>
                     {e.likes.length}
                     </div>
                     </>
                }
                </div>
                {data.author._id === userId && <ButtonGroup style={{marginTop: "10px"}}>
                    <Button className="btn-light" style={{display: "flex", justifyContent: "center"}}><PencilFill 
            onClick={() => setModalUpdPost(true)}/></Button>
            <Button variant="secondary" style={{display: "flex", justifyContent: "center"}}><Trash3 onClick={delPost}/></Button>
            </ButtonGroup>}
                </Col>
                )
            }
        </Row>
        <h3>Комментарии</h3>
        {allComments.length > 0
                ?  <div>{allComments.map(el => <Row>
                    <Col>
                    <Card style={{marginBottom: "10px"}}>
                        <Card.Body>
                            <Card.Title><Col><span style={{verticalAlign: "center"}}>
                            <Image src={el.author.avatar} alt={el.author.name} style={{maxHeight: "1.5rem", margin: "0.5rem"}} rounded/>
                               {el.author.name} {new Date(el.created_at).toLocaleDateString()}</span>
                                </Col>
                                </Card.Title>
                            <Card.Text style={{padding: "10px"}}>{el.text}
                           {el.author._id === userId && <div style={{marginTop: "10px"}}>
                                <Button variant="secondary" style={{display: "flex", justifyContent: "center"}}><Trash3 onClick={() => delComment(el._id)}/>
                                </Button>
                            </div>}
                            </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>
                )}</div>
            : <p>Еще никто не прокомментировал...</p>
        }
    <Row>
        {hideForm && <Button variant="outline-dark" 
        onClick={() => setHideForm(false)}
        style={{width: "150px", margin: "10px 10px"}}
        >
            Оставить комментарий
            </Button>}
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
            <div style={{margin: "10px 0"}}>
            <Button variant="outline-secondary" onClick={() => setHideForm(true)}
           style={{marginRight: "10px"}}
            >
            Закрыть
            </Button>
            <Button type="submit" variant="outline-success">
            Добавить
            </Button>
            </div>
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