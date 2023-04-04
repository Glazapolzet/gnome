import './ActivityPopup.css'
import Popup from "./Popup";
import {useState} from "react";

export default function ActivityPopup (props) {

  // const [probeCode, setProbeCode] = useState();
  // const [probeCode, setProbeCode] = useState();
  // const [probeCode, setProbeCode] = useState();
  // const [probeCode, setProbeCode] = useState();
  // const [probeCode, setProbeCode] = useState();
  // const [probeCode, setProbeCode] = useState();
  // const [probeCode, setProbeCode] = useState();

  return (
    <Popup
      name={"Измерение активности"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Измерение активности гамма-излучающих радионуклидов на сцинтилляционном гамма-спектрометре."}
      description={`Установите счетный образец на детектор. Введите в таблицу информацию о счетном образце и методе пробоподготовки. Нажмите <Продолжить> для пуска измерения.`}
    >
      <form name="activity-form" className="ActivityPopup__form">
        <fieldset className="ActivityPopup__input-container">
          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-code" className="ActivityPopup__input-label">
              Код пробы
            </label>
            <input
              name="probe-code"
              type="number"
              className="ActivityPopup__input"
              min={1}
            />
            <label htmlFor="probe-code" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-name" className="ActivityPopup__input-label">
              Название
            </label>
            <input
              name="probe-name"
              type="text"
              className="ActivityPopup__input"
              minLength={1}
            />
            <label htmlFor="probe-name" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-date" className="ActivityPopup__input-label">
              Дата отбора
            </label>
            <input
              name="probe-date"
              type="datetime-local"
              className="ActivityPopup__input"
              min={1}
            />
            <label htmlFor="probe-date" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-type" className="ActivityPopup__input-label">
              Тип пробы
            </label>
            <select
              name="probe-type"
              className="ActivityPopup__input ActivityPopup__input_type_selection"
            >
              <option selected={true}>Прочие</option>
              <option>Пищ.пр</option>
              <option>Стр.мат</option>
              <option>Вода</option>
              <option>Лес</option>
            </select>
            <label htmlFor="probe-type" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-method" className="ActivityPopup__input-label">
              Метод пробоподготовки
            </label>
            <select
              name="probe-method"
              className="ActivityPopup__input ActivityPopup__input_type_selection"
            >
              <option selected={true}>Натив</option>
              <option>Опция2</option>
              <option>Опция3</option>
            </select>
            <label htmlFor="probe-method" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-weight" className="ActivityPopup__input-label">
              Масса пробы
            </label>
            <select
              name="probe-weight"
              className="ActivityPopup__input ActivityPopup__input_type_selection"
            >
              <option selected={true}>1000</option>
              <option>500</option>
            </select>
            <label htmlFor="probe-weight" className="ActivityPopup__input-label ActivityPopup__input-label_back">
              г
            </label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="geometry" className="ActivityPopup__input-label">
              Геометрия
            </label>
            <select
              name="geometry"
              className="ActivityPopup__input ActivityPopup__input_type_selection"
            >
              <option selected={true}>Точка_14мм</option>
              <option>Маринелли</option>
              <option>Петри</option>
              <option>Половина_Маринелли</option>
            </select>
            <label htmlFor="geometry" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="rn-consistency" className="ActivityPopup__input-label">
              Р/н состав
            </label>
            <input
              name="rn-consistency"
              type="text"
              className="ActivityPopup__input"
              minLength={1}
              defaultValue={"137Cs_и_ЕРН"}
            />
            <label htmlFor="rn-consistency" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="exposition" className="ActivityPopup__input-label">
              Экспозиция
            </label>
            <input
              name="exposition"
              type="number"
              className="ActivityPopup__input"
              min={1800}
              defaultValue={3600}
              step={1800}
            />
            <label htmlFor="exposition" className="ActivityPopup__input-label ActivityPopup__input-label_back">
              с
            </label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="trials" className="ActivityPopup__input-label">
              Повторить измерение
            </label>
            <input
              name="trials"
              type="number"
              className="ActivityPopup__input"
              defaultValue={1}
              min={1}
            />
            <label htmlFor="trials" className="ActivityPopup__input-label ActivityPopup__input-label_back">
              раз
            </label>
          </div>
        </fieldset>
      </form>
      <div className="ActivityPopup__buttons-wrapper">
        <button
          formTarget="activity-form"
          form="activity-form"
          type="reset"
          className="ActivityPopup__button"
        >
          Сброс
        </button>
        <button
          type="button"
          className="ActivityPopup__button"
          onClick={props.onClick}
        >
          Продолжить
        </button>
      </div>
    </Popup>
  )
}