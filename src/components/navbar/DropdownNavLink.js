import './DropdownNavLink.css';
import DropdownMenu from "./DropdownMenu";
import {useState} from "react";

export default function DropdownNavLink (props) {

  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  function toggleDropdown() {
    setDropdownVisibility(!isDropdownVisible);
  }

  return (
    <div className={`DropdownNavLink ${props.isDisabled ? "DropdownNavLink_disabled" : ""}`}>
      {props.icon ? (
        <button
          type="button"
          className={`DropdownNavLink__btn ${props.isDisabled ? "DropdownNavLink__btn_disabled" : ""}`}
          onClick={toggleDropdown}
          style={{
            backgroundImage: `url(${props.icon})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            width: 28,
            padding: 0
          }}
          disabled={props.isDisabled}
        />
      ) : (
          <button
            type="button"
            className={`DropdownNavLink__btn ${props.isDisabled ? "DropdownNavLink__btn_disabled" : ""}`}
            onClick={toggleDropdown}
            disabled={props.isDisabled}
          >
            {props.title}
          </button>
      )}
      <div className={`DropdownNavLink__dropdown ${
        isDropdownVisible
          ? "DropdownNavLink__dropdown_visible"
          : ""}`}
      >
        <DropdownMenu content={props.dropdown} toggleDropdown={toggleDropdown} />
      </div>
    </div>
  )

}