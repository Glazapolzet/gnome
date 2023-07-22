import {useContext} from "react";
import {GlobalContext} from "../contexts/GlobalContext";

const useGlobal = (): [boolean, (val: boolean) => void]  => {
  const {firstTimePopupShown, setFirstTimePopupShown} = useContext(GlobalContext);

  return [
    firstTimePopupShown,
    setFirstTimePopupShown
  ]
}

export default useGlobal;