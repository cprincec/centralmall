import { IoClose } from "react-icons/io5";
import GeneralContext from "../contexts/general";
import { useContext } from "react";

const Notification = ({ message, error }) => {
  const { removeNotification } = useContext(GeneralContext);
  return (
    <div className={`notice ${error && "error-notice"}`}>
      <button onClick={removeNotification}>
        <IoClose />
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
