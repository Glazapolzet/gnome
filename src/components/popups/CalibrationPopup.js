import './CalibrationPopup.css';
import Popup from "./Popup";

export default function CalibrationPopup (props) {

  return(
    <Popup
      name={"Энергетическая калибровка"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Энергетическая калибровка сцинтилляционного гамма-спектрометра."}
      description={`Установите контрольный источник <137Cs+40K> на детектор и нажмите <Продолжить> для пуска измерений.`}
    >
      <div className="CalibrationPopup__buttons-wrapper">
        <button
          type="button"
          className="CalibrationPopup__button"
          onClick={props.onClick}
        >
          Продолжить
        </button>
      </div>
    </Popup>

  )
}