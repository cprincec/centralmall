import { createContext, useState } from "react";

const GeneralContext = createContext({
  searching: false,
  toggleSearching: () => {},
  currentShop: "",
  changeShop: () => {},
  params: "",
  changeParams: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [searching, setSearching] = useState(false);
  const [currentShop, setCurrentShop] = useState();
  const [params, setParams] = useState("");
  const toggleSearching = () => {
    setSearching((prevValue) => !prevValue);
  };

  const changeShop = (shopId) => {
    setCurrentShop(shopId);
  };

  const changeParams = (params) => {
    setParams(params);
  };

  const generalCtxValue = {
    searching: searching,
    currentShop,
    changeShop,
    params,
    changeParams,
  };

  return (
    <GeneralContext.Provider value={generalCtxValue}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
