import { useContext, useState, useEffect } from "react";
import { Button, Figure, Image, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {PencilSquare, XSquare, CheckSquare, Square} from "react-bootstrap-icons";
import CardPost from "../components/CardPost";
import notUser from "../image/notuser.png";
import Context from "../Contex";
import Utils from "../Utils";

const Home = () => {
  const { baseData, setModalPost, userId, token, userData, user } = useContext(Context);
  const { filterPost, getUniqueAuthorsId } = useContext(Utils);
  const [index, setIndex] = useState(0);
  const [visibleData, setVisibleData] = useState([]);
  const [tags, setTags] = useState([]);
  let pageSize = 3;
  const newPost = () => {
    setModalPost(true)
  };

  useEffect(() => {
    const numberOfItems = pageSize * (index + 1);
    const newArray = [];
    for (let i = 0; i < baseData.length; i++) {
      if (i < numberOfItems)
        newArray.push(baseData[i])
    }
    setVisibleData(newArray);
  }, [index, baseData])

  useEffect(() => {
    if (tags === userId) {
      setTags(getUniqueAuthorsId(baseData));
      pageSize = 10;
    }
  }, [])
  
  return (
    <div className="container" style={{ marginTop: "30px", maxHeight: "100%" }}>
      <div className="row">
        {user ? <><div className="col-sm-2">
          <Figure style={{margin: 0}}>
            <Figure.Image src={userData.avatar} alt={userData.name} roundedCircle/>
             <h3>{userData.name}</h3>
            <p>{userData.about}</p>
          </Figure>
         <Nav className="flex-column" defaultActiveKey="/" style={{maxWidth: "150px"}}>
          <Nav.Link eventKey="link-1">
            <Button variant="outline-dark" onClick={newPost}>Новый пост</Button>
            </Nav.Link>
          <Nav.Link eventKey="link-2">
          <Link to="/allposts">Все посты</Link>
          </Nav.Link>
          <Nav.Link eventKey="link-3">
          <Link to="/favorites">Избранное</Link>
          </Nav.Link>
          <Nav.Link eventKey="link-4">
          <Link onClick={() => setVisibleData(filterPost(baseData).byAuthorId(userId).data)}>
                #Мои посты</Link>
          </Nav.Link>
         </Nav>
        </div>
        <div className="col-sm-10">
          <div className="row justify-content-center align-self-center">
            {visibleData.map((pro, i) => (
              <CardPost key={i}
                title={pro.title}
                image={pro.image}
                text={pro.text}
                id={pro._id}
                author={pro.author}
                likes={pro.likes}
              />
            ))}
            <br/>
          </div>
          <div className="row justify-content-center align-self-center">
          <Button variant="outline-dark" className="w-25" onClick={() => setIndex(index + 1)}>
              Загрузить еще
            </Button>
            </div>
        </div>
        </>
        : <><div class="col-sm-4">
        <h2>About Me</h2>
        <h5>Photo of me:</h5>
        <Figure.Image src={notUser} 
        alt="Аватар пользователя"/>
        </div>
        <div className="col-sm-8 row">
          <div className="justify-content-center align-self-center">
           <h5 style={{margin: "1rem"}}>Авторизуйтесь, чтобы увидеть посты</h5>
           </div>
          </div>
          </>
      }
      </div>
    </div>
  )
}

export default Home;