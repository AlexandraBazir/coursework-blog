import { useContext, useState } from "react";
import Context from "../Contex";
import { Container, Row, Figure, Button, Col } from "react-bootstrap";
import {PencilSquare} from "react-bootstrap-icons";
import UpdUserInput from "../components/UpdUserInput";
import CardPost from "../components/CardPost";

const Profile = () => {
    const {baseData, token, setUserData, userData} = useContext(Context);
    
    const [inpName, setInpName] = useState(false);
  const [inpAbout, setInpAbout] = useState(false);


  const [inpAvatar, setInpAvatar] = useState(userData.avatar);
  const [activeImg, setActiveImg] = useState(false);


  const updUser = (name, val) => {
    let body = {
        name: userData.name, 
        about: userData.about
    }
    body[name]= val;
    fetch("https://api.react-learning.ru/users/me", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(data => {
          setUserData(data);
        });
}
const updUserAva = () => {
    let body = {
      avatar: inpAvatar
    }
    fetch("https://api.react-learning.ru/users/me/avatar", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(data => {
          setUserData(data);
          setActiveImg(false)
        });
  }
return <>
    <Container style={{ marginTop: "30px", maxHeight: "100%" }}>
    <Row>
    {userData?.name && <>
    <Col md="auto" >
          <Figure>
            <Figure.Image src={userData.avatar} 
            alt={userData.name} 
            style={{ maxWidth: "350px", objectFit: "cover"}} rounded/>
            <Figure.Caption>
            <UpdUserInput
            val={inpAvatar}
            data={userData.avatar}
            activeImg={activeImg}
            setInpAvatar={setInpAvatar}
            setActiveImg={setActiveImg}
            upd={updUserAva}
            name="avatar"
            />
            {!activeImg ?
            <Button 
            className="btn-light"
            style={{display: "flex", justifyContent: "center", padding: "5px"}}
            onClick={() => setActiveImg(true)}
            >
              <PencilSquare/>
              </Button>
              : <>
              </>
          }
            </Figure.Caption>
            </Figure>
            </Col>
            <Col sm={4}>
            <div><UpdUserInput
            val={userData.name}
            isActive={inpName}
            changeActive={setInpName}
            upd={updUser}
            name="name"
            /></div>
            <div><UpdUserInput
            val={userData.about}
            isActive={inpAbout}
            changeActive={setInpAbout}
            upd={updUser}
            name="about"
            />
            </div>
            </Col>
          </>}
    </Row>
<Row>
<Col sm={12}>
            <h3>Мои посты</h3>
        </Col>
        {baseData.filter(el => el.author._id === userData._id).map(
            (pro) => <CardPost key={pro._id}
            title={pro.title}
            image={pro.image}
            text={pro.text}
            id={pro._id}
            author={pro.author}
            likes={pro.likes}
            />
        )}
</Row>
    </Container>
</>
}

export default Profile;