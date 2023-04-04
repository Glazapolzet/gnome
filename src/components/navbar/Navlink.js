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
          className={`Navlink__btn ${props.isDisabled ? "Navlink__btn__disabled" : ""}`}
          type="button"
          style={{
            backgroundImage: `url(${props.icon})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: 28,
            height: 28,
            padding: 0
          }}
          //обработчик при нажатии самой кнопки (пока не получает пропс, но может понадобиться для подтверждения выхода в меню)
          onClick={props.onClick}
          disabled={props.isDisabled}
        >
        </button>
      ) : (
        <button
          className={`Navlink__btn ${props.isDisabled ? "Navlink__btn__disabled" : ""}`}
          type="button"
          style={{
            minWidth: 70,
          }}
          onClick={props.onClick}
          disabled={props.isDisabled}
        >
          {props.title}
        </button>
      )}
    </NavLink>
  )

}
