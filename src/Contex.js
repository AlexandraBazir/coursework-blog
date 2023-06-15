import { createContext } from "react";

const Context = createContext({
    searchResult: "",
    setBaseData: () => {}
});

export default Context;