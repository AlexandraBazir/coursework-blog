import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Trash3, HeartFill, Heart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Context from "../../Contex";

import "./style.css"

const CardPost = ({title, image, text, id, author, likes}) => {
    const {token, setBaseData, userId} = useContext(Context);
    const navigate = useNavigate();
    const [isLike, setIsLike] = useState(likes.includes(userId));
    const [likeFlag, setLikeFlag] = useState(false);
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
  const likeHandler = () => {
    setIsLike(!isLike);
        setLikeFlag(true);
}

useEffect(() => {
    if (likeFlag) {
        fetch(`https://api.react-learning.ru/v2/group-12/posts/likes/${id}`, {
            method: isLike ? "PUT" : "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(data => {
              setLikeFlag(false);
              fetch(`https://api.react-learning.ru/v2/group-12/posts`, {
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              })
                  .then(res => res.json())
                  .then(newData => {
                      setBaseData(newData);
            })
          })
        }
      }, [isLike])
    return  <Card style={{ 
      width: '18rem', 
    marginBottom: "1rem", 
    marginRight: "1rem" 
    }}>
      <Card.Img variant="top" src={image} 
      style={{padding: "0.5rem", maxHeight: "300px", objectFit: "cover"}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{margin: "0.5rem 0"}}>
          {author.name}
        </Card.Text>
        <Card.Text>
        {text}
        </Card.Text>
        <Row className="align-items-center">
          <Col sm={7}>
        <Link to={`/posts/${id}`}><Button variant="outline-dark">Читать далее</Button></Link>
        </Col>
        <Col sm={2}>
          <div style={{display: "flex", justifyContent: "space-evenly",
            alignItems: "center", cursor: "pointer"
            }}>
          <Trash3 onClick={delPost}/>
          </div>
          </Col>
          <Col style={{cursor: "pointer"}} onClick={likeHandler} sm={3}>
            {isLike
            ? <div style={{display: "flex", justifyContent: "space-evenly",
            alignItems: "center"
            }}>
              <HeartFill/>
              <div style={{verticalAlign: "center"}}>
              {likes.length !== 0 && likes.length}
              </div>
              </div>
            : <div style={{display: "flex", justifyContent: "space-evenly",
            alignItems: "center"
            }}>
             <Heart/>
              <div style={{verticalAlign: "center"}}>
                {likes.length !== 0 && likes.length}
              </div>
              </div>
            }
          </Col>
          </Row>
      </Card.Body>
    </Card>
}

export default CardPost;
