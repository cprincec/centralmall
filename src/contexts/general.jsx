import { createContext, useState } from "react";

const GeneralContext = createContext({
  searching: false,
  toggleSearching: () => {},
  currentShop: "",
  changeShop: () => {},
  params: "",
  changeParams: () => {},
  notificationMessage: "",
  showDialog: "",
  errorNotification: "",
  createNotification: () => {},
  removeNotification: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [searching, setSearching] = useState(false);
  const [currentShop, setCurrentShop] = useState();
  const [params, setParams] = useState("");

  // Notification states
  const [showDialog, setShowDialog] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  // tracks if the notification is an error notice
  const [errorNotification, setErrorNotification] = useState(false);

  const toggleSearching = () => {
    setSearching((prevValue) => !prevValue);
  };

  const changeShop = (shopId) => {
    setCurrentShop(shopId);
  };

  const changeParams = (params) => {
    setParams(params);
  };

  const createNotification = (message, error) => {
    setShowDialog(true);
    setNotificationMessage(message);
    setErrorNotification(error);
    setTimeout(() => {
      setShowDialog(false);
    }, 5000);
  };

  const removeNotification = () => {
    setShowDialog(false);
  };

  const generalCtxValue = {
    searching: searching,
    currentShop,
    changeShop,
    params,
    changeParams,
    notificationMessage,
    showDialog,
    errorNotification,
    createNotification,
    removeNotification,
  };

  return (
    <GeneralContext.Provider value={generalCtxValue}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
