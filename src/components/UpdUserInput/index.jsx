import { useState } from "react";
import {Button, Form, Col} from "react-bootstrap";
import {PencilSquare, XSquare, CheckSquare} from "react-bootstrap-icons";

const UpdUserInput = ({
    val, 
    isActive, 
    changeActive, 
    data, 
    name, 
    setInpAvatar, 
    setInpName,
    setInpAbout,
    upd,
    activeImg,
    setActiveImg
}) => {
    const [inp, setInp] = useState(val);
    return <>
    <div>
    {activeImg !== true ? <><Col></Col></>
    : <> 
    {name === "avatar" && <><Form.Control
    type="text"
    defaultValue={data}
    value={val}
    onChange={(e) => setInpAvatar(e.target.value)}
    />
    <Button onClick={() => setActiveImg(false)} style={{color: "red"}}>
              <XSquare/>
          </Button>
          <Button onClick={upd}>
              <CheckSquare/></Button>
    </>
    }
    </>
    }
    </div>
    <div>
    {!isActive && name !== "avatar"
        ? <> {val} <Button onClick={() => changeActive(true)}><PencilSquare/></Button> </>
        : <> {name !== "avatar" && <><Form.Control value={inp} onChange={(e) => setInp(e.target.value)}/>
        <Button variant="danger" onClick={() => {changeActive(false)}}><XSquare/></Button>
        <Button variant="success" onClick={() => {
            changeActive(false)
            upd(name, inp)
            }}><CheckSquare/></Button>
            </>}
        </>
    }
    </div>
    </>
}

export default UpdUserInput;