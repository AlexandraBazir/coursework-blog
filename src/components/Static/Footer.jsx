import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="container">
  <footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item">
        <Link className="nav-link px-2 text-body-secondary" to="/">Главная</Link>
        </li>
      <li className="nav-item">
        <Link className="nav-link px-2 text-body-secondary" to="/allposts">Все посты</Link>
        </li>
      <li className="nav-item">
        <Link className="nav-link px-2 text-body-secondary" to="/favorites">Избранное</Link>
        </li>
    </ul>
    <p className="text-center text-body-secondary">© 2023 Alexandra Bazir</p>
  </footer>
</div>
    )
}

export default Footer;