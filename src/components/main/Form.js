import "./Form.css";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {FormContext} from "../../contexts/formContext";
import {PATH_START} from "../../constants/pathnames";

export default function Form () {

  //TODO: контекст формы не сбрасывается, если перейти на /info и обратно сюда

  const { setFormSubmitStatus, userData, setUserData } = useContext(FormContext);

  const [dataValidity, setDataValidity] = useState({
    'name': false,
    'group': false
  });

  const [isFirstEntered, setFirstEntered] = useState({
    'name': true,
    'group': true
  });

  const [isFormValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFormValid(Object.keys(dataValidity).every(key => dataValidity[key] === true))
  }, [dataValidity])

  function handleBlur(evt) {
    setFirstEntered({
      ...isFirstEntered,
      [`${evt.target.name}`]: false
    });
  }

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
    return dataValidity[fieldName] || isFirstEntered[fieldName]
  }

  function handleChange(evt) {
    updateData(evt);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    navigate(PATH_START);
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
