import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Context from "../../Contex";


const Search = () => {
    const { setPosts, baseData} = useContext(Context);
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const changeValue = (e) => {
        navigate("/allposts");
        let val = e.target.value.toLowerCase();
        setText(val);
    }
    useEffect(() => {        
        let result = baseData.filter(el => el.title.toLowerCase().includes(text));
        setPosts(result);
    }, [text, baseData]);
    return <>
    <input className="form-control text-bg-white" type="search" placeholder="Search..." aria-label="Search"
    value={text} 
    onChange={changeValue}/>
    </>
}

export default Search;