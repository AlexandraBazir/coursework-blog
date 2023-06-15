import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Context from "../../Contex";

const ModalLogin = () => {
    const {modalOpen, setModalOpen, setUser} = useContext(Context);
    const [isReg, setIsReg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const changeForm = (e) => {
        e.preventDefault();
        setIsReg(!isReg);
        clearForm();
    }
    const clearForm = () => {
        setName("");
        setEmail("");
        setPwd("");
        setPwd2("");
    }
    const handleForm = async (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password: pwd
        }
        if (isReg) {
            body.name = name
            body.group = "group-12"
        }
        const path = `https://api.react-learning.ru/${isReg ? "signup" : "signin"}`;
        const res = await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await res.json();
        if (isReg) {
            if (data?._id) {
                setIsReg(false);
            }
        } else {
            if (data && data.token) {
                localStorage.setItem("token12", data.token)
            }
            if (data?.data) {
                localStorage.setItem("user12", data.data.name);
                setUser(data.data.name);
                localStorage.setItem("user12-id", data.data._id);
                clearForm();
                setModalOpen(false);
            }
        }
    }
  

    const [show, setShow] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
    return <>
    {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={modalOpen} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{isReg ? "Регистрация" : "Вход"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {isReg && <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Ваше имя</Form.Label> <Form.Control
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                 </Form.Group>}
                 <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Ваш электронный адрес</Form.Label>
        <Form.Control type="email"
                    placeholder="Ваш электронный адрес"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ваш пароль</Form.Label>
        <Form.Control type="password"
                    placeholder="Ваш пароль"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                     />
      </Form.Group>
                {isReg && <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Повторите пароль</Form.Label>
        <Form.Control type="password"
                    placeholder="Повторите пароль"
                    value={pwd2}
                    onChange={(e) => setPwd2(e.target.value)}
                     />
      </Form.Group>}
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleForm} disabled={isReg && (!pwd || pwd !== pwd2)}>
          {isReg ? "Зарегистрироваться" : "Войти"}
          </Button>
          <a href="/" onClick={changeForm} style={{color: "#0E0E0E"}}>
                        {isReg ? "Войти" : "Зарегистрироваться"}
                        </a>
        </Modal.Footer>
      </Modal>
</>
}

export default ModalLogin;