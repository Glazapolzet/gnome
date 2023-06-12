import './Spectre.css';
import {useContext, useEffect, useState} from "react";
import {SpectreContext} from "../../../contexts/spectreContext";
import {FormContext} from "../../../contexts/formContext";
import Doc from "../../rad-doc/Doc";
import {WindowContext} from "../../../contexts/windowContext";
import Popup from "../../popup/Popup";
import GammaExploring, {PotatoExploringActions} from "../../../actions/gammaExploring";

export default function Spectre (props) {

  const {elements} = useContext(SpectreContext);
  const {activityForm} = useContext(FormContext);
  const {
    spectreForm, setSpectreForm,
    isSpectreOnSubmit, setSpectreOnSubmit
  } = useContext(FormContext);
  const {shouldResetNormsConclusion, setShouldResetNormsConclusion} = useContext(WindowContext);

  const [showNorms, setShowNorms] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const cs = convertToFloat(elements.cs);
  const st = convertToFloat(elements.st);

  useEffect(() => {
    if (shouldResetNormsConclusion) {
      setSpectreOnSubmit(false);
      setSpectreForm({
        exceedingTheNorm: "Результат превышает значения, указанные в нормативе",
      });

      if (GammaExploring.check_action_added(PotatoExploringActions.SUBMIT_CONCLUSION_CHOOSE)) {
        GammaExploring.cancel_action(PotatoExploringActions.SUBMIT_CONCLUSION_CHOOSE);
      }

      setShouldResetNormsConclusion(false);
    }
  }, [])

  function convertToFloat(element) {
    return parseFloat(element.slice(0, element.indexOf(" ")))
  }

  function handleChange(evt) {
    setSpectreForm({
      [`${evt.target.name}`]: evt.target.value,
    });
  }

  function showReport() {
    setShowNorms(!showNorms);
  }

  function checkAnswer() {
    switch (true) {
      case spectreForm.exceedingTheNorm === 'Результат превышает значения, указанные в нормативе':
        if (cs <= 120 && st <= 40) {
          GammaExploring.add_action_with_penalty(PotatoExploringActions.SUBMIT_CONCLUSION_CHOOSE, 0.2);
        } else {
          GammaExploring.add_action_with_penalty(PotatoExploringActions.SUBMIT_CONCLUSION_CHOOSE, 0.0);
        }
        break;
      case spectreForm.exceedingTheNorm === 'Превышение по нормативу не обнаружено':
        if (cs <= 120 && st <= 40) {
          GammaExploring.add_action_with_penalty(PotatoExploringActions.SUBMIT_CONCLUSION_CHOOSE, 0);
        } else {
          GammaExploring.add_action_with_penalty(PotatoExploringActions.SUBMIT_CONCLUSION_CHOOSE, 0.2);
        }
        break;
      default:
        break;
    }
  }

  function handleReset() {
    GammaExploring.cancel_action(PotatoExploringActions.SUBMIT_CONCLUSION_CHOOSE);
    setSpectreOnSubmit(false);
  }

  function handleSubmit() {
    checkAnswer();
    setSpectreOnSubmit(true);
    setShowPopup(true);
  }

  function handlePopupClose() {
    setShowPopup(false);
  }

  function switchContent() {
    switch (showNorms) {
      case false:
        return (
          <>
            <Popup
              name={"Сообщение"}
              isOpen={showPopup}
              onClose={handlePopupClose}
              title={"Ваш ответ сохранен!"}
              description={`Чтобы изменить вариант ответа нажмите <Сбросить ответ>`}
            />
            <div className="Spectre">
              <div className="Spectre__info">
                <h3 className="Spectre__title">
                  Определите, обнаружено ли превышение по нормативу (Cs, St):
                </h3>
                <button className="Spectre__button" type="button" onClick={showReport}>
                  Посмотреть таблицу нормативов
                </button>
              </div>
              <div className="Spectre__conclusion">
                <h3 className="Spectre__title">Сделайте вывод:</h3>
                <select
                  name="exceedingTheNorm"
                  className="Spectre__input"
                  value={spectreForm.exceedingTheNorm}
                  onChange={handleChange}
                  disabled={isSpectreOnSubmit}
                >
                  <option value={"Результат превышает значения, указанные в нормативе"}>
                    Результат превышает значения, указанные в нормативе
                  </option>
                  <option value={"Превышение по нормативу не обнаружено"}>
                    Превышение по нормативу не обнаружено
                  </option>
                </select>
                <div className="Spectre__button-area">
                  <button className="Spectre__button" type="button" onClick={handleReset}>
                    Сбросить ответ
                  </button>
                  <button className="Spectre__button" type="button" onClick={handleSubmit}>
                    Сохранить ответ
                  </button>
                </div>
              </div>
              <div className="Spectre__measurements">
                <h3 className="Spectre__title Spectre__title_right">Результаты обработки</h3>
                <ul className="Spectre__list">
                  <li className="Spectre__list-item">
                    <p className="Spectre__item Spectre__item_content_name">Геометрия</p>
                    <p className="Spectre__item Spectre__item_content_value">{activityForm.geometry}</p>
                  </li>
                  <li className="Spectre__list-item">
                    <p className="Spectre__item Spectre__item_content_name">Задача</p>
                    <p className="Spectre__item Spectre__item_content_value">Измерение активности</p>
                  </li>
                  <li className="Spectre__list-item">
                    <p className="Spectre__item Spectre__item_content_name">Код пробы</p>
                    <p className="Spectre__item Spectre__item_content_value">{activityForm.probeCode}</p>
                  </li>
                  <li className="Spectre__list-item">
                    <p className="Spectre__item Spectre__item_content_name">Экспозиция</p>
                    <p className="Spectre__item Spectre__item_content_value">LT:170.97</p>
                  </li>
                </ul>

                <div className="Spectre__divider"/>

                <ul className="Spectre__list">
                  <li className="Spectre__list-item">
                    <p className="Spectre__item Spectre__item_content_name">137Cs</p>
                    <p className="Spectre__item Spectre__item_content_value">{elements.cs}</p>
                  </li>
                  <li className="Spectre__list-item">
                    <p className="Spectre__item Spectre__item_content_name">90St</p>
                    <p className="Spectre__item Spectre__item_content_value">{elements.st}</p>
                  </li>
                  <li className="Spectre__list-item">
                    <p className="Spectre__item Spectre__item_content_name">232Th</p>
                    <p className="Spectre__item Spectre__item_content_value">{elements.th}</p>
                  </li>
                  <li className="Spectre__list-item">
                    <p className="Spectre__item Spectre__item_content_name">40K</p>
                    <p className="Spectre__item Spectre__item_content_value">{elements.k}</p>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )
      case true:
        return (
          <div className="Spectre__doc">
            <button className="Spectre__button Spectre__button_single" type="button" onClick={showReport}>Назад</button>
            <Doc file={props.file}></Doc>
          </div>
        )
      default:
        return
    }
  }

  return switchContent()
}