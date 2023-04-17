import './Spectre.css';
import {useContext} from "react";
import {FormContext} from "../../../contexts/formContext";
import {SpectreContext} from "../../../contexts/spectreContext";

export default function Spectre () {

  const {activityForm} = useContext(FormContext);

  const {elements} = useContext(SpectreContext);

  return (
    <div className="Spectre">
      <div className="Spectre__content">
        <h2 className="Spectre__title">Результаты обработки</h2>
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
            <p className="Spectre__item Spectre__item_content_name">226Rs</p>
            <p className="Spectre__item Spectre__item_content_value">{elements.rs}</p>
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
  )
}