import './FirstTimePopup.css'
import Popup from "./Popup";

export default function FirstTimePopup (props) {
  return (
    <Popup
      name={""}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Предупреждение"}
      description={"Для того чтобы продолжить, вам необходимо подождать, пока прогреются приборы установки. Выберите, сколько минут вы будете ждать:"}
    >
      <div className="FirstTimePopup__buttons-wrapper">
        <button
          type="button"
          className="FirstTimePopup__button"
          // global state
          onClick={props.onClick}
        >
          20-30 минут
        </button>
        <button
          type="button"
          className="FirstTimePopup__button"
          // global state
          onClick={props.onClick}
        >
          10-15 минут
        </button>
        <button
          type="button"
          className="FirstTimePopup__button"
          // global state
          onClick={props.onClick}
        >
          50 минут
        </button>
      </div>
    </Popup>
  )
}