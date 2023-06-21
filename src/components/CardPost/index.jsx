import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Context from "../../Contex";

import "./style.css"

const CardPost = ({title, image, text, id, author}) => {
    const {token, setBaseData} = useContext(Context);
    const navigate = useNavigate();
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
    return  <Card style={{ 
      width: '18rem', 
    marginBottom: "1rem", 
    marginRight: "1rem" 
    }}>
      <Card.Img variant="top" src={image} style={{padding: "0.5rem", maxHeight: "300px"}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {author.name}
        </Card.Text>
        <Card.Text>
        {text}
        </Card.Text>
        <Link to={`/posts/${id}`}><Button variant="outline-dark">Читать далее</Button></Link>
        <span style={{margin: "1rem", cursor: "pointer"}}>
          <Trash3 onClick={delPost}/>
          </span>
      </Card.Body>
    </Card>
}

export default CardPost;
