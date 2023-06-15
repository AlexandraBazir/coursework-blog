import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Static/Header";
import Home from "./pages/Home";
import Footer from "./components/Static/Footer";
import ModalLogin from "./components/Modal/ModalLogin";
import ModalPost from "./components/Modal/ModalPost";

import './index.css';
import Context from "./Contex";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [token, setToken] = useState(localStorage.getItem("token12"));
  // const [group, setGroup] = useState(localStorage.getItem("group-12"))
  const [baseData, setBaseData] = useState([]);
  console.log(token);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPost, setModalPost] = useState(false);
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
    token
  }}>
      <Header/>
      <main>
      <Home/>
      </main>
    <Footer/>
    <ModalLogin/>
    <ModalPost/>
    </Context.Provider>
    </>
  );
}

export default App;
