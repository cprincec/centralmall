import { createContext } from "react";

const shop = createContext({
    currentShop: "",
    changeShop: () => {}
})

export default shop;