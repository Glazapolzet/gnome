import './ActivityPopup.css'
import Popup from "./Popup";
import {useContext, useEffect} from "react";
import {FormContext} from "../../contexts/formContext";

export default function ActivityPopup (props) {

  const {
    isActivityFormOnSubmit,
    setActivityFormSubmitStatus,
    activityForm,
    setActivityForm
  } = useContext(FormContext);

  useEffect(() => {
    if(props.isOpen) {
      setDefaultValues();
    }
  }, [props.isOpen])

  function setDefaultValues () {
    setActivityForm({

    })
    // setProbeCode("");
    // setProbeName("");
    // setProbeDate("");
    // setProbeType("Прочие");
    // setProbeMethod("Натив");
    // setProbeWeight("1000");
    // setGeometry("Точка_14мм");
    // setRnConsistency("137Cs_и_ЕРН");
    // setExposition("3600");
    // setTrials("1");
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    setActivityFormSubmitStatus(true);
  }

  return (
    <Popup
      name={"Измерение активности"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Измерение активности гамма-излучающих радионуклидов на сцинтилляционном гамма-спектрометре."}
      description={`Установите счетный образец на детектор. Введите в таблицу информацию о счетном образце и методе пробоподготовки. Нажмите <Продолжить> для пуска измерения.`}
    >
      <form id="activity-form" name="activity-form" className="ActivityPopup__form" onSubmit={handleSubmit}>
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
              value={probeCode}
              onChange={(evt) => setProbeCode(evt.target.value)}
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
              value={probeName}
              onChange={(evt) => setProbeName(evt.target.value)}
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
              value={probeDate}
              onChange={(evt) => setProbeDate(evt.target.value)}
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
              value={probeType}
              onChange={(evt) => setProbeType(evt.target.value)}
            >
              <option value={"Прочие"}>Прочие</option>
              <option value={"Пищ.пр"}>Пищ.пр</option>
              <option value={"Стр.мат"}>Стр.мат</option>
              <option value={"Вода"}>Вода</option>
              <option value={"Лес"}>Лес</option>
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
              value={probeMethod}
              onChange={(evt) => setProbeMethod(evt.target.value)}
            >
              <option value={"Натив"}>Натив</option>
              <option value={"Опция2"}>Опция2</option>
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
              value={probeWeight}
              onChange={(evt) => setProbeWeight(evt.target.value)}
            >
              <option value={"1000"}>1000</option>
              <option value={"500"}>500</option>
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
              value={geometry}
              onChange={(evt) => setGeometry(evt.target.value)}
            >
              <option value={"Точка_14мм"}>Точка_14мм</option>
              <option value={"Маринелли"}>Маринелли</option>
              <option value={"Петри"}>Петри</option>
              <option value={"Половина_Маринелли"}>Половина_Маринелли</option>
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
              value={rnConsistency}
              onChange={(evt) => setRnConsistency(evt.target.value)}
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
              step={1800}
              value={exposition}
              onChange={(evt) => setExposition(evt.target.value)}
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
              min={1}
              value={trials}
              onChange={(evt) => setTrials(evt.target.value)}
            />
            <label htmlFor="trials" className="ActivityPopup__input-label ActivityPopup__input-label_back">
              раз
            </label>
          </div>
        </fieldset>
      </form>
      <div className="ActivityPopup__buttons-wrapper">
        <button
          form="activity-form"
          type="reset"
          className="ActivityPopup__button"
          onClick={setDefaultValues}
        >
          Сброс
        </button>
        <button
          form="activity-form"
          type="submit"
          className="ActivityPopup__button"
          onClick={props.onClick}
        >
          Продолжить
        </button>
      </div>
    </Popup>
  )
}