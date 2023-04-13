import {useContext} from "react";
import {FormContext} from "../../../contexts/formContext";
import './ResearchReport.css';

export default function ResearchReport () {
  const {activityForm} = useContext(FormContext);

  return (
    <div className="ResearchReport">
      <h2 className="ResearchReport__title">Результаты испытаний продукции</h2>
      <h3 className="ResearchReport__subtitle">Исходные данные и информация об измерении:</h3>
      <ul className="ResearchReport__list">
        <li className="ResearchReport__list-item">
          <p className="ResearchReport__item ResearchReport__item_content_name">Код образца:</p>
          <p className="ResearchReport__item ResearchReport__item_content_value">
            {activityForm.probeCode}
          </p>
        </li>
        <li className="ResearchReport__list-item">
          <p className="ResearchReport__item ResearchReport__item_content_name">Дата измерения:</p>
          <p className="ResearchReport__item ResearchReport__item_content_value">
            {activityForm.probeDate.replace("T", " ")}
          </p>
        </li>
        <li className="ResearchReport__list-item">
          <p className="ResearchReport__item ResearchReport__item_content_name">Геометрия измерения:</p>
          <p className="ResearchReport__item ResearchReport__item_content_value">
            {activityForm.geometry}
          </p>
        </li>
        <li className="ResearchReport__list-item">
          <p className="ResearchReport__item ResearchReport__item_content_name">Время экспозиции, с:</p>
          <p className="ResearchReport__item ResearchReport__item_content_value">
            {activityForm.exposition}
          </p>
        </li>
        <li className="ResearchReport__list-item">
          <p className="ResearchReport__item ResearchReport__item_content_name">Вид пробы:</p>
          <p className="ResearchReport__item ResearchReport__item_content_value">
            {activityForm.probeType}
          </p>
        </li>
        <li className="ResearchReport__list-item">
          <p className="ResearchReport__item ResearchReport__item_content_name">Дата отбора:</p>
          <p className="ResearchReport__item ResearchReport__item_content_value">
            {activityForm.probeDate.replace("T", " ")}
          </p>
        </li>
        <li className="ResearchReport__list-item">
          <p className="ResearchReport__item ResearchReport__item_content_name">Метод подготовки:</p>
          <p className="ResearchReport__item ResearchReport__item_content_value">
            {activityForm.probeMethod}
          </p>
        </li>
        <li className="ResearchReport__list-item">
          <p className="ResearchReport__item ResearchReport__item_content_name">Масса пробы, г:</p>
          <p className="ResearchReport__item ResearchReport__item_content_value">
            {activityForm.probeWeight}
          </p>
        </li>
      </ul>
    </div>
  )
}