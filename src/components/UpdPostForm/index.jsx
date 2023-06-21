import { Form } from "react-bootstrap";

const UpdPostForm = ({ val, data, name, setTags, setImage, setText, setTitle}) => {
    return <>
        {name === "title" && <Form.Group className="mb-3" htmlFor="title">
            <Form.Label>Заголовок поста</Form.Label> <Form.Control
                type="title"
                defaultValue={data}
                id="title"
                placeholder={val}
                value={val}
                onChange={(e) => setTitle(e.target.value)}
            />
        </Form.Group>}
        {name === "text" && <Form.Group className="mb-3" htmlFor="text">
            <Form.Label>Текст поста</Form.Label>
            <Form.Control style={{ height: "10rem" }}
                as="textarea"
                defaultValue={data}
                type="text"
                id="text"
                value={val}
                onChange={(e) => setText(e.target.value)}
            />
        </Form.Group>}
        {name === "image" && <Form.Group className="mb-3" htmlFor="image">
            <Form.Label>Картинка</Form.Label> <Form.Control
                type="text"
                defaultValue={data}
                id="image"
                value={val}
                onChange={(e) => setImage(e.target.value)}
            />
        </Form.Group>}
        {name === "tags" && <Form.Group className="mb-3" htmlFor="tags">
            <Form.Label>Теги</Form.Label> <Form.Control
                type="text"
                defaultValue={data}
                id="tags"
                value={val}
                onChange={(e) => setTags(e.target.value)}
            />
        </Form.Group>}
    </>
}

export default UpdPostForm;