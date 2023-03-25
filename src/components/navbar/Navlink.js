import "./Navlink.css"
import { NavLink } from "react-router-dom";

export default function Navlink(props) {

  return (
    <NavLink
      to={props.leadingTo}
      className={({isActive}) => isActive ? "Navlink Navlink_active" : "Navlink"}
    >
      {props.icon ? (
        <button
          className="Navlink__btn"
          type="button"
          style={{
            backgroundImage: `url(${props.icon})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: 28,
            height: 28,
            padding: 0
          }}
        >
        </button>
      ) : (
        <button
          className="Navlink__btn"
          type="button"
          style={{
            minWidth: 70,
          }}
        >
          {props.title}
        </button>
      )}
    </NavLink>
  )

}
