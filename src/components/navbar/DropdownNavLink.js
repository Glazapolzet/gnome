import './DropdownNavLink.css';
import DropdownMenu from "./DropdownMenu";
import {useState} from "react";

export default function DropdownNavLink (props) {

  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  function handleDropdownBtnClick() {
    setDropdownVisibility(!isDropdownVisible);
  }

  return (
    <li className="DropdownNavLink">
      <button
        type="button"
        className="DropdownNavLink__btn"
        onClick={handleDropdownBtnClick}
      >
        {props.title}
      </button>
      <div className={`DropdownNavLink__dropdown ${
        isDropdownVisible
          ? "DropdownNavLink__dropdown_visible"
          : ""}`}
      >
        <DropdownMenu content={props.dropdown} />
      </div>
    </li>
  )

}