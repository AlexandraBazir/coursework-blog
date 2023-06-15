import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CardPost from "../components/CardPost";
import Context from "../Contex";

const Home = () => {
  const {baseData, setModalPost} = useContext(Context);
  const pageSize = 4;
  const [index, setIndex] = useState(0);
  const [visibleData, setVisibleData] = useState([]);
  const newPost = () => {
    setModalPost(true)
};
  useEffect(() => {
    const numberOfItems = pageSize * (index + 1); 
    const newArray = []; 

    for(let i= 0; i < baseData.length; i++ ){
      if(i < numberOfItems) 
          newArray.push(baseData[i])
    }
    setVisibleData(newArray);
}, [index, baseData])
    return (
        <div class="container" style={{marginTop:"30px", maxHeight:"100%"}}>
  <div className="row">
    <div class="col-sm-4">
      <h2>About Me</h2>
      <h5>Photo of me:</h5>
      <div class="fakeimg">Fake Image</div>
      <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
      <h3>Some Links</h3>
      <p>Lorem ipsum dolor sit ame.</p>
      <ul class="nav nav-pills flex-column">
        <li class="nav-item">
          <Button variant="outline-dark" onClick={newPost}>Новый пост</Button>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      <hr class="d-sm-none"/>
    </div>
    <div className="col-sm-8">
      <div className="row justify-content-center align-self-center">
        {visibleData.map((pro, i) => (
          <CardPost key={i}
          title={pro.title}
          image={pro.image}
          text={pro.text}
          id={pro._id}
          />
        ))}
        <Button variant="outline-dark" className="w-25" onClick={() => setIndex (index + 1)}>
          Загрузить еще
        </Button>
      </div>
    </div>
  </div>
</div>
    )
}

export default Home;