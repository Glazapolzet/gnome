import './BackgroundPopup.css'
import Popup from "./Popup";
import {useContext, useEffect} from "react";
import {FormContext} from "../../contexts/formContext";
import {WindowContext} from "../../contexts/windowContext";

export default function BackgroundPopup (props) {

  const {
    isBackgroundPending,
    setBackgroundPending,
    isCalibrationPending,
    isActivityPending,
    backgroundForm,
    setBackgroundForm
  } = useContext(FormContext);

  const {setBackgroundReportDone} = useContext(WindowContext);

  useEffect(() => {
    if (props.isOpen) {
      setDefaultValues();
    }
  }, [props.isOpen])

  function setDefaultValues () {
    setBackgroundForm({
      averaging: "0.4",
      exposition: 1800
    })
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    setBackgroundReportDone(false);
    setBackgroundPending(true);
  }

  return (
    <Popup
      name={"Гамма. Измерение фона"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Измерение фонового спектра сцинтилляционного гамма-спектрометра."}
      description={`Уберите контрольный источник с детектора и нажмите <Продолжить> для пуска измерений.`}
    >
      <form id="backgroundForm" className="BackgroundPopup__form" onSubmit={handleSubmit}>
        <fieldset className="BackgroundPopup__input-container">
          <label htmlFor="avg" className="BackgroundPopup__input-label">
            Усреднять спектры с весом
          </label>
          <input
            name="averaging"
            type="number"
            className="BackgroundPopup__input"
            value={backgroundForm.averaging}
            onChange={(evt) => setBackgroundForm({...backgroundForm, averaging: evt.target.value})}
            min={0}
            max={1}
            step={0.1}
          />
          <label htmlFor="exposition" className="BackgroundPopup__input-label">
            Время экспозиции
          </label>
          <input
            name="exposition"
            type="number"
            className="BackgroundPopup__input"
            value={backgroundForm.exposition}
            onChange={(evt) => setBackgroundForm({...backgroundForm, exposition: evt.target.value})}
            min={1800}
            step={1800}
          />
          <label htmlFor={"exposition"} className="BackgroundPopup__input-label">
            с
          </label>
        </fieldset>
      </form>
      <div className="BackgroundPopup__buttons-wrapper">
        <button
          form="backgroundForm"
          type="reset"
          className="BackgroundPopup__button"
          onClick={setDefaultValues}
        >
          Сброс
        </button>
        <button
          form="backgroundForm"
          type="submit"
          className={`BackgroundPopup__button ${
            isCalibrationPending || isBackgroundPending || isActivityPending
              ? "BackgroundPopup__button_disabled"
              : ""}`}
          onClick={props.onClick}
          disabled={isCalibrationPending || isBackgroundPending || isActivityPending}
        >
          Продолжить
        </button>
      </div>
    </Popup>
  )
}