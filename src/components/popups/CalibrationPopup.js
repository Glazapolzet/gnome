import './CalibrationPopup.css';
import Popup from "./Popup";
import {useContext} from "react";
import {FormContext} from "../../contexts/formContext";
import {WindowContext} from "../../contexts/windowContext";
import GammaExploring, { PotatoExploringActions } from "../../actions/gammaExploring.ts";

export default function CalibrationPopup (props) {

  // Лучше давать компоненту только те данные, которые он использует
  // вместо всех стейтов можно использовать только стейт disableButton из какого-нибудь другого компонента

  const {
    isCalibrationPending,
    isBackgroundPending,
    isActivityPending,
    setCalibrationPending
  } = useContext(FormContext);

  const {setCalibrationReportDone} = useContext(WindowContext);

  function handleBtnClick() {
    props.onClick();
    setCalibrationReportDone(false);
    setCalibrationPending(true);
    GammaExploring.add_action(PotatoExploringActions.ACTIVATE_CALIBRATION_POPUP);
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
          onClick={handleBtnClick}
          disabled={isCalibrationPending || isBackgroundPending || isActivityPending}
        >
          Продолжить
        </button>
      </div>
    </Popup>
  )
}