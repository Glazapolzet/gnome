import './BackgroundPopup.css'
import Popup from "./Popup";
import {useEffect, useState} from "react";

export default function BackgroundPopup (props) {

  const [avg, setAvg] = useState("0.4");
  const [exposition, setExposition] = useState("1800");

  useEffect(() => {
    setDefaultValues();
  }, [props.isOpen])

  function setDefaultValues () {
    setAvg("0.4");
    setExposition("1800");
  }

  return (
    <Popup
      name={"Гамма. Измерение фона"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Измерение фонового спектра сцинтилляционного гамма-спектрометра."}
      description={`Уберите контрольный источник с детектора и нажмите <Продолжить> для пуска измерений.`}
    >
      <form className="BackgroundPopup__form">
        <fieldset className="BackgroundPopup__input-container">
          <label htmlFor="avg" className="BackgroundPopup__input-label">
            Усреднять спектры с весом
          </label>
          <input
            name="avg"
            type="number"
            className="BackgroundPopup__input"
            value={avg}
            onChange={(evt) => setAvg(evt.target.value)}
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
            value={exposition}
            onChange={(evt) => setExposition(evt.target.value)}
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
          formTarget="activity-form"
          form="activity-form"
          type="reset"
          className="ActivityPopup__button"
          onClick={setDefaultValues}
        >
          Сброс
        </button>
        <button
          type="button"
          className="BackgroundPopup__button"
          onClick={props.onClick}
        >
          Продолжить
        </button>
      </div>
    </Popup>
  )
}