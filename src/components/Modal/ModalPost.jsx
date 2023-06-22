import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Context from "../../Contex";

const ModalPost = () => {
    const navigate = useNavigate();
    const {modalPost, setModalPost, token, setBaseData} = useContext(Context);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState(["blogAB"]);
    const [tagWord, setTagWord] = useState("");
    const tagsHandler = (e) => {
        const val = e.target.value;
        const last = val[val.length - 1];
        setTagWord(val);
        if (/\s/.test(last)) {
            const word = val.slice(0, val.length - 1);
            const test = tags.filter(tg => tg.toLowerCase() === word.toLowerCase());
            if (!test.length) {
                setTags(prev => [...prev, word]);
            }
            setTagWord("");
        } else {
            setTagWord(val);
        }
    }
    const clearForm = () => {
        setTitle("");
        setImage("");
        setText("");
        setTagWord("");
        setTags(["blogAB"]);
    }
    const delTag = (e) => {
        const val = e.target.innerText;
        setTags(prev => prev.filter(tg => tg !== val));
    }
    const handleForm = (e) => {
        e.preventDefault();
        const body = {
            title: title,
            image: image,
            text: text,
            tags: tagWord && !tags.includes(tagWord) ? [...tags, tagWord] : tags,
            isPublished: true
        };
        fetch("https://api.react-learning.ru/v2/group-12/posts", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.err && !data.error) {
                clearForm();
                setModalPost(false);
                navigate("/")
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
        })
    }
  const handleClose = () => setModalPost(false);
    return <>
    <Modal show={modalPost} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cоздание нового поста</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Заголовок поста</Form.Label> <Form.Control
                    type="text"
                    placeholder="Введите заголовок поста"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Изображение</Form.Label>
        <Form.Control type="url"
                    placeholder="Вставьте ссылку на изображение"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                     />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Текст поста</Form.Label>
        <Form.Control type="text"
                    as="textarea"
                    placeholder="Введите текст поста"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                     />
      </Form.Group>
 <Form.Group className="mb-3" controlId="formBasicTags">
        <Form.Label>Теги</Form.Label>
        <Form.Control 
        type="text"
                    placeholder="Добавить теги"
                    value={tagWord}
                    onChange={tagsHandler}
                     />
                      <Form.Text as="div" className="mt-1 d-flex" style={{gap: ".25rem"}}>
                            {tags.map(tg => <Button 
                            key={tg} 
                            variant={tg === "df" ? "warning" : "secondary"}
                            disabled={tg === "df"}
                            onClick={delTag}
                            >{tg}</Button>)}
                        </Form.Text>
      </Form.Group>
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleForm}>
          Добавить пост
          </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default ModalPost;