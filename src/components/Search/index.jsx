import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Context from "../../Contex";


const Search = () => {
    const { setPosts, baseData, setSearchResult} = useContext(Context);
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [num, setNum] = useState(0);
    const changeValue = (e) => {
        navigate("/search");
        let val = e.target.value.toLowerCase();
        setText(val);
    }
    useEffect(() => {
        let str = "";
        if (num && text) {
            str = `По запросу "${text}" найдено ${num} постов`;
        } else if (text) {
            str = `По запросу "${text}" не найдено ни одного поста`;
        } else {
            str = "";
        }
        setSearchResult(str);
    }, [num, text]);
    useEffect(() => {        
        let result = baseData.filter(el => el.title.toLowerCase().includes(text));
        setPosts(result);
        setNum(result.length);
    }, [text, baseData]);
    return <>
    <input className="form-control text-bg-white" type="search" placeholder="Search..." aria-label="Search"
    value={text} 
    onChange={changeValue}/>
    </>
}

export default Search;