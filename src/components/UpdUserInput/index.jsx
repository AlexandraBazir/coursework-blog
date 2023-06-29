import { useState } from "react";
import {Button, Form, Col} from "react-bootstrap";
import {PencilSquare, Check2, X} from "react-bootstrap-icons";

const UpdUserInput = ({
    val, 
    isActive, 
    changeActive, 
    data, 
    name, 
    setInpAvatar,
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
    style={{marginBottom: "5px"}}
    type="text"
    defaultValue={data}
    value={val}
    onChange={(e) => setInpAvatar(e.target.value)}
    />
    <div style={{display: "flex", justifyContent: "start", marginBottom: "10px"}}>
    <Button 
    variant="outline-secondary" 
    onClick={() => setActiveImg(false)} 
    style={{display: "grid", alignSelf: "center", padding: "0", marginRight: "5px"}}
    >
              <X/>
          </Button>
          <Button 
          variant="outline-success" 
          style={{display: "grid", alignItems: "center", padding: 0}}
          onClick={upd}>
              <Check2/></Button>
              </div>
    </>
    }
    </>
    }
    </div>
    <div>
    {!isActive && name !== "avatar"
        ? <> {val} <Button className="btn-light"
        style={{display: "flex", justifyContent: "center", marginBottom: "10px", padding: "5px"}} onClick={() => changeActive(true)}><PencilSquare/></Button> </>
        : <> {name !== "avatar" && <><Form.Control style={{marginBottom: "5px"}} value={inp} onChange={(e) => setInp(e.target.value)}/>
        <div style={{display: "flex", justifyContent: "start", marginBottom: "10px"}}>
        <Button 
        variant="outline-secondary" 
        style={{display: "grid", alignSelf: "center", padding: "0", marginRight: "5px"}}
        onClick={() => {changeActive(false)}}>
            <X/>
            </Button>
        <Button variant="outline-success" 
         style={{display: "grid", alignItems: "center", padding: 0}}
        onClick={() => {
            changeActive(false)
            upd(name, inp)
            }}><Check2/></Button>
            </div>
            </>}
        </>
    }
    </div>
    </>
}

export default UpdUserInput;