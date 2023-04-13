import "./Form.css";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {FormContext} from "../../contexts/formContext";

export default function Form () {

  const { setFormSubmitStatus } = useContext(FormContext);

  const [userInput, setUserInput] = useState("");
  const [groupInput, setGroupInput] = useState("");
  const [isGroupInputValid, setGroupInputStatus] = useState(true);
  const [isUserInputValid, setUserInputStatus] = useState(true);
  const [isFormDataValid, setFormDataStatus] = useState(false);

  const navigate = useNavigate();

  function handleUserInputChange(evt) {
    setUserInput(evt.target.value);
    setUserInputStatus(evt.target.value !== "");
    setFormDataStatus(evt.target.value !== "" && groupInput !== "");
  }

  function handleGroupInputChange(evt) {
    setGroupInput(evt.target.value);
    setGroupInputStatus(evt.target.value !== "");
    setFormDataStatus(userInput !== "" && evt.target.value !== "");
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    navigate('/quiz');
    setFormSubmitStatus(true);
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
          required={true}
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
          required={true}
          onChange={handleGroupInputChange}
        />
      </fieldset>
      <button
        type="submit"
        className={`Form__btn ${isFormDataValid ? "" : "Form__btn_disabled"}`}
        disabled={!isFormDataValid}
      >
        Начать
      </button>
    </form>
  )
}
