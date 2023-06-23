import { useContext } from "react";
import { Link } from "react-router-dom";
import { PersonSquare } from "react-bootstrap-icons";
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
    <header className="p-3"> 
    <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-black text-decoration-none">
        <img src={logoImg} alt="TravelBlog" height="40"/>
        <span className="nav-link px-2 text-white" style={{fontWeight: "bold", color: "white"}}>TravelBlog</span>
        </Link>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/allposts" className="nav-link px-2 text-white">Все посты</Link></li>
          <li><Link to="/favorites" className="nav-link px-2 text-white">Избранное</Link></li>
        </ul>
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <Search setGoods={setGoods}/>
        </form>
        <div className="text-end d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          {!user && <button type="button" className="btn btn-outline-light me-2" onClick={login}>Войти</button>}
          {user && <>
          <button type="button" className="btn btn-light" onClick={logout}>Выйти</button>
            <button type="button" className="btn btn-light" style={{marginLeft: "1rem"}}>
            <Link className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" to="/profile" 
            style={{fontSize: "1.5rem", color: "black"}}><PersonSquare/></Link>
            </button>
          </>}
        </div>
        </div>
        </div>
        </header>
)
}

export default Header;