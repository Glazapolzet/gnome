import "./Navlink.css"
import { NavLink } from "react-router-dom";

export default function Navlink(props) {

  return (
    <NavLink
      to={`/`}
      className={({isActive}) => isActive ? "Navlink Navlink_active" : "Navlink"}
    >
      <button className="Navlink__btn" type="button">
        {props.title}
      </button>
    </NavLink>
  )

}
