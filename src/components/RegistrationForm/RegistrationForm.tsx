import React, {FC, useContext, useState} from "react";
import {FormContext} from "../../contexts/formContext";
import {useNavigate} from "react-router-dom";
import useInput from "../../hooks/useInput";
import useValidate from "../../hooks/useValidate";


interface RegistrationFormProps {
  onSubmit: () => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({onSubmit}) => {

  const {userData, setUserData} = useContext(FormContext);

  const navigate = useNavigate();

  const [formData, handleInputChange] = useInput({
    name: "",
    group: "",
  });

  const {valid, handleValidChange, handleBlur} = useValidate(formData);



  return (

  )
}

export default RegistrationForm;