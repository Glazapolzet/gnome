import './ActivityPopup.css'
import Popup from "./Popup";
import {useContext, useEffect} from "react";
import {FormContext} from "../../contexts/formContext";

export default function ActivityPopup (props) {

  const {
    isActivityPending,
    setActivityPending,
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
      probeCode: "",
      probeName: "",
      probeDate: "",
      probeType: "Прочие",
      probeMethod: "Натив",
      probeWeight: "1000",
      geometry: "Точка_14мм",
      rnConsistency: "137Cs_и_ЕРН",
      exposition: 3600,
      trials: "1"
    })
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    setActivityPending(true);
  }

  return (
    <Popup
      name={"Измерение активности"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Измерение активности гамма-излучающих радионуклидов на сцинтилляционном гамма-спектрометре."}
      description={`Установите счетный образец на детектор. Введите в таблицу информацию о счетном образце и методе пробоподготовки. Нажмите <Продолжить> для пуска измерения.`}
    >
      <form id="activityForm" name="activity-form" className="ActivityPopup__form" onSubmit={handleSubmit}>
        <fieldset className="ActivityPopup__input-container">
          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-code" className="ActivityPopup__input-label">
              Код пробы
            </label>
            <input
              name="probeCode"
              type="number"
              className="ActivityPopup__input"
              min={1}
              value={activityForm.probeCode}
              onChange={(evt) => {setActivityForm({...activityForm, probeCode: evt.target.value})}}
            />
            <label htmlFor="probe-code" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-name" className="ActivityPopup__input-label">
              Название
            </label>
            <input
              name="probeName"
              type="text"
              className="ActivityPopup__input"
              minLength={1}
              value={activityForm.probeName}
              onChange={(evt) => setActivityForm({...activityForm, probeName: evt.target.value})}
            />
            <label htmlFor="probe-name" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-date" className="ActivityPopup__input-label">
              Дата отбора
            </label>
            <input
              name="probeDate"
              type="datetime-local"
              className="ActivityPopup__input"
              value={activityForm.probeDate}
              onChange={(evt) => setActivityForm({...activityForm, probeDate: evt.target.value})}
            />
            <label htmlFor="probe-date" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-type" className="ActivityPopup__input-label">
              Тип пробы
            </label>
            <select
              name="probeType"
              className="ActivityPopup__input ActivityPopup__input_type_selection"
              value={activityForm.probeType}
              onChange={(evt) => setActivityForm({...activityForm, probeType: evt.target.value})}
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
              name="probeMethod"
              className="ActivityPopup__input ActivityPopup__input_type_selection"
              value={activityForm.probeMethod}
              onChange={(evt) => setActivityForm({...activityForm, probeMethod: evt.target.value})}
            >
              <option value={"Натив"}>Натив</option>
            </select>
            <label htmlFor="probe-method" className="ActivityPopup__input-label ActivityPopup__input-label_back"></label>
          </div>

          <div className="ActivityPopup__input-wrapper">
            <label htmlFor="probe-weight" className="ActivityPopup__input-label">
              Масса пробы
            </label>
            <select
              name="probeWeight"
              className="ActivityPopup__input ActivityPopup__input_type_selection"
              value={activityForm.probeWeight}
              onChange={(evt) => setActivityForm({...activityForm, probeWeight: evt.target.value})}
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
              value={activityForm.geometry}
              onChange={(evt) => setActivityForm({...activityForm, geometry: evt.target.value})}
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
              name="rnConsistency"
              type="text"
              className="ActivityPopup__input"
              minLength={1}
              value={activityForm.rnConsistency}
              onChange={(evt) => setActivityForm({...activityForm, rnConsistency: evt.target.value})}
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
              value={activityForm.exposition}
              onChange={(evt) => setActivityForm({...activityForm, exposition: evt.target.value})}
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
              value={activityForm.trials}
              onChange={(evt) => setActivityForm({...activityForm, trials: evt.target.value})}
            />
            <label htmlFor="trials" className="ActivityPopup__input-label ActivityPopup__input-label_back">
              раз
            </label>
          </div>
        </fieldset>
      </form>
      <div className="ActivityPopup__buttons-wrapper">
        <button
          form="activityForm"
          type="reset"
          className="ActivityPopup__button"
          onClick={setDefaultValues}
        >
          Сброс
        </button>
        <button
          form="activityForm"
          type="submit"
          className="ActivityPopup__button"
          onClick={props.onClick}
          disabled={isActivityPending}
        >
          Продолжить
        </button>
      </div>
    </Popup>
  )
}