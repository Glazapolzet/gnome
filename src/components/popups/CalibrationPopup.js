import './CalibrationPopup.css';
import Popup from "./Popup";
import {useContext} from "react";
import {FormContext} from "../../contexts/formContext";

export default function CalibrationPopup (props) {

  const {isCalibrationPending, setCalibrationPending} = useContext(FormContext);

  function handleClick() {
    props.onClick();
    setCalibrationPending(true);
  }

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
          onClick={handleClick}
          disabled={isCalibrationPending}
        >
          Продолжить
        </button>
      </div>
    </Popup>
  )
}