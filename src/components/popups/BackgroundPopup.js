import './BackgroundPopup.css'
import Popup from "./Popup";

export default function BackgroundPopup (props) {

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
            min={1800}
            step={100}
          />
          <label htmlFor={"exposition"} className="BackgroundPopup__input-label">
            с
          </label>
        </fieldset>
      </form>
      <div className="BackgroundPopup__buttons-wrapper">
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