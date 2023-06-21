import { useContext } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../src/image/logo.png";
import Context from "../../Contex";
import Search from "../Search";

import "./style.css";

const Header = () => {
    const { user, setUser, setModalOpen, setGoods } = useContext(Context);
    const login = () => {
      setModalOpen(true)
  };
  const logout = () => {
    localStorage.removeItem("user12")
    setUser(null);
};
    return (
    <header class="p-3"> 
    <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-black text-decoration-none">
        <img src={logoImg} alt="TravelBlog" class="bi me-2" height="40"/>
        <span className="logo__text" class="text-white" style={{fontWeight: "bold"}}>TravelBlog</span>
        </Link>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-white">Home</a></li>
          {/* <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li> */}
        </ul>
        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <Search setGoods={setGoods}/>
        </form>
        <div class="text-end">
          {!user && <button type="button" class="btn btn-outline-light me-2" onClick={login}>Войти</button>}
          {user && <button type="button" class="btn btn-light" onClick={logout}>Выйти</button> }
        </div>
        </div>
        </div>
        </header>
)
}

export default Header;