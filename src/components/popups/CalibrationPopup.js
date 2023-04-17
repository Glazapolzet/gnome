import './CalibrationPopup.css';
import Popup from "./Popup";
import {useContext} from "react";
import {FormContext} from "../../contexts/formContext";
import {WindowContext} from "../../contexts/windowContext";

export default function CalibrationPopup (props) {

  const {
    isCalibrationPending,
    isBackgroundPending,
    isActivityPending,
    setCalibrationPending
  } = useContext(FormContext);

  const {setCalibrationReportDone} = useContext(WindowContext);

  function handleClick() {
    props.onClick();
    setCalibrationReportDone(false);
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
          className={`CalibrationPopup__button ${
            isCalibrationPending || isBackgroundPending || isActivityPending
              ? "CalibrationPopup__button_disabled"
              : ""}`}
          onClick={handleClick}
          disabled={isCalibrationPending || isBackgroundPending || isActivityPending}
        >
          Продолжить
        </button>
      </div>
    </Popup>
  )
}