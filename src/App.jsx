import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Static/Header";
import Home from "./pages/Home";
import Footer from "./components/Static/Footer";
import ModalLogin from "./components/Modal/ModalLogin";
import ModalPost from "./components/Modal/ModalPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import Favorites from "./pages/Favorites";
import Context from "./Contex";
import Utils, {initialValue as utilValue} from "./Utils";
import Profile from "./pages/Profile"
import blackList from "./data/blackList.json"
import './index.css';

function App() {
  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token12"));
  // const [group, setGroup] = useState(localStorage.getItem("group-12"))
  const [baseData, setBaseData] = useState([]);
  const [posts, setPosts] = useState(baseData);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPost, setModalPost] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  useEffect(() => {
    if (user) {
      setUserId(localStorage.getItem("user12-id"));
      setToken(localStorage.getItem("token12"));
    } else {
      localStorage.removeItem("user12-id")
      localStorage.removeItem("token12")
      setUserId(null);
      setToken(null);
    }
  }, [user])

  useEffect(() => {
    if (token) {
      fetch("https://api.react-learning.ru/v2/group-12/posts", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          setBaseData(data);
        })
    }
  }, [token])
  useEffect(() => {
    fetch("https://api.react-learning.ru/users/me", {
      headers: {
          "Authorization": `Bearer ${token}`,
      },
  }).then(res => res.json())
    .then(data => {
        setUserData(data);
    })
}, [])
  return (<>
  <Context.Provider value={{
    user,
    setUser,
    modalOpen,
    setModalOpen,
    baseData,
    setBaseData,
    modalPost,
    setModalPost,
    token,
    searchResult,
    setSearchResult,
    setPosts,
    posts,
    userId,
    setUserData,
    userData
  }}>
    <Utils.Provider value={utilValue}>
      <Header/>
      <Routes>
        <Route path="/posts/:id" element={<Post/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/allposts" element={<AllPosts/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    <Footer/>
    <ModalLogin/>
    <ModalPost/>
    </Utils.Provider>
    </Context.Provider>
    </>
  );
}

export default App;
