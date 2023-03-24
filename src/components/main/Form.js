import "./Form.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Form () {

  const [userInput, setUserInput] = useState("");
  const [groupInput, setGroupInput] = useState("");
  const [isGroupInputValid, setGroupInputStatus] = useState(true);
  const [isUserInputValid, setUserInputStatus] = useState(true);
  const [isFormDataValid, setFormDataStatus] = useState(false);

  function handleUserInputChange(evt) {
    setUserInput(evt.target.value);
    setUserInputStatus(evt.target.value !== "");
  }

  function handleGroupInputChange(evt) {
    setGroupInput(evt.target.value);
    setGroupInputStatus(evt.target.value !== "");
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    setFormDataStatus(isUserInputValid && isGroupInputValid);
    console.log(isFormDataValid);
  }

  return (
    <form className="Form" onSubmit={handleFormSubmit}>
      <fieldset className="Form__input-container">
        <legend className="Form__legend">Данные студента</legend>
        <label htmlFor="user-input" className="Form__input-label">ФИО</label>
        <input
          type="text"
          id="user-input"
          placeholder="Введите фамилию и имя"
          value={userInput}
          className={`Form__input ${
            isUserInputValid 
            ? ""
            : "Form__input_type_invalid"}`}
          minLength="1"
          aria-required={true}
          onChange={handleUserInputChange}
        />
        <label htmlFor="group-input" className="Form__input-label">Группа</label>
        <input
          type="text"
          id="group-input"
          placeholder="Введите свою группу"
          value={groupInput}
          className={`Form__input ${
            isGroupInputValid
              ? ""
              : "Form__input_type_invalid"}`}
          minLength="1"
          aria-required={true}
          onChange={handleGroupInputChange}
        />
      </fieldset>
      <Link to={`quiz`} className="Form__btn-wrapper">
        <button
          type="submit"
          className={`Form__btn ${isFormDataValid ? "" : "Form__btn_disabled"}`}
          disabled={isFormDataValid}
        >
          Начать
        </button>
      </Link>
    </form>
  )
}
