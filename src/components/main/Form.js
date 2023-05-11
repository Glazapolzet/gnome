import "./Form.css";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {FormContext} from "../../contexts/formContext";

export default function Form () {

  const { setFormSubmitStatus } = useContext(FormContext);

  const [userData, setUserData] = useState({
    'name': "",
    'group': ""
  });

  const [dataValidity, setDataValidity] = useState({
    'name': false,
    'group': false
  })

  const [isFormValid, setFormValid] = useState(false)

  const [isJustOpened, setJustOpened] = useState(true);

  const navigate = useNavigate();

  function updateData(evt) {
    setUserData({
      ...userData,
      [`${evt.target.name}`]: evt.target.value
    })

    setDataValidity({
      ...dataValidity,
      [`${evt.target.name}`]: evt.target.value !== ""
    })
  }

  function isFieldValid(fieldName) {
    return dataValidity[fieldName] || isJustOpened
  }

  function checkFormValid(evt) {
    return Object.keys(dataValidity).every(key => {
      if (key !== evt.target.name) {
        return dataValidity[key] === true
      }
      return true
    }) && evt.target.value !== ""
  }

  function handleChange(evt) {
    setJustOpened(false);
    updateData(evt);
    setFormValid(checkFormValid(evt));
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    navigate('/quiz');
    setFormSubmitStatus(true);
  }

  return (
    <form className="Form" onSubmit={handleFormSubmit}>
      <fieldset className="Form__input-container">

        <legend className="Form__legend">
          Данные студента
        </legend>

        <label htmlFor="name-input" className="Form__input-label">
          ФИО
        </label>
        <input
          type="text"
          id="name-input"
          name="name"
          placeholder="Введите фамилию и имя"
          value={userData.name}
          className={`Form__input ${
            isFieldValid('name')
              ? ""
              : "Form__input_type_invalid"
          }`}
          required={true}
          onChange={handleChange}
        />

        <label htmlFor="group-input" className="Form__input-label">
          Группа
        </label>
        <input
          type="text"
          id="group-input"
          name="group"
          placeholder="Введите свою группу"
          value={userData.group}
          className={`Form__input ${
            isFieldValid('group')
              ? ""
              : "Form__input_type_invalid"
          }`}
          required={true}
          onChange={handleChange}
        />

      </fieldset>

      <button
        type="submit"
        className={`Form__btn ${
          isFormValid
            ? "" 
            : "Form__btn_disabled"
        }`}
        disabled={!isFormValid}
      >
        Начать
      </button>

    </form>
  )
}
