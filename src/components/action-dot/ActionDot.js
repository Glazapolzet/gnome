import "./ActionDot.css";
import {useNavigate} from "react-router-dom";
import ActionDotDropdown from "./ActionDotDropdown";
import {useState} from "react";

export default function ActionDot (props) {

  const navigate = useNavigate();

  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  function toggleDropdown() {
    setDropdownVisibility(!isDropdownVisible);
  }

  function handleClick() {
    if (props.dropdown) {
      toggleDropdown();
    }

    if (props.onClick) {
      props.onClick();
    }

    if (props.leadingTo) {
      navigate(props.leadingTo);
    }
  }

  return (
    <div
      className="ActionDot"
      style={{
        top: props.y/880*100 + "%",
        left: props.x/1512*100 + "%"
      }}
    >
      <button
        type={"button"}
        className="ActionDot__btn"
        onClick={handleClick}
      />
      {props.dropdown
        ? <ActionDotDropdown
        content={props.dropdown}
        toggleDropdown={toggleDropdown}
        isDropdownVisible={isDropdownVisible}
      />
      : null}

    </div>
  )
}
