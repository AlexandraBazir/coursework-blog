import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Context from "../../Contex";

import "./style.css"

const CardPost = ({title, image, text, id}) => {
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
    return <>
    <Card className="" style={{ 
      width: '18rem', 
    marginBottom: "1rem", 
    marginRight: "1rem" 
    }}>
      <Card.Img variant="top" src={image} style={{padding: "0.5rem", maxHeight: "300px"}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        {text}
        </Card.Text>
        <Button variant="outline-dark">Читать полностью...</Button><span style={{margin: "1rem", cursor: "pointer"}}><Trash3 onClick={delPost}/></span>
      </Card.Body>
    </Card>
    </>
}

export default CardPost;
