import { useContext, useEffect, useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import Context from "../Contex";
import { Container, Row, Figure, Button, Col } from "react-bootstrap";
import {PencilSquare, XSquare, CheckSquare} from "react-bootstrap-icons";
import UpdUserInput from "../components/UpdUserInput";
import CardPost from "../components/CardPost";

const Profile = () => {
    const navigate = useNavigate();
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
    <Container>
    <Row>
    {userData?.name && <>
          <Figure>
            <Figure.Image src={userData.avatar} alt={userData.name}/>
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
            <Button onClick={() => setActiveImg(true)}>
              <PencilSquare/>
              </Button>
              : <>
              </>
          }




            </Figure.Caption>
            </Figure>
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
          </>}

    </Row>
<Row>
<Col xs={12}>
            <h3>Мои посты</h3>
        </Col>
        {baseData.filter(el => el.author._id === userData._id).map(
            e => <Col xs={4} lg={2} md={4} key={e._id}>
                <CardPost {...e}/>
            </Col>
        )}
</Row>


    </Container>

</>



}

export default Profile;