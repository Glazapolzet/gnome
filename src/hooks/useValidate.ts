import React, {useState} from "react";


type fieldDataProps = {
  [index: string]: string,
}

type validityProps = {
  [index: string]: boolean,
}

interface ReturnProps {
  valid: validityProps,
  handleValidChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  handleBlur: (evt: React.ChangeEvent<HTMLInputElement>) => void,
}

const useValidate = (fieldData: fieldDataProps): ReturnProps => {

  // const firstEntered = Object.keys(fieldData).reduce((prev, curr) => Object.assign(prev, {[`${curr}`]: true}), {});
  // const validity = Object.keys(fieldData).reduce((prev, curr) => Object.assign(prev, {[`${curr}`]: false}), {});

  const firstEntered = {};
  const validity = {};

  for (const key of Object.keys(fieldData)) {
    Object.assign(firstEntered, {[`${key}`]: true});
    Object.assign(validity, {[`${key}`]: false});
  }

  const [valid, setValid] = useState(validity);
  const [isFirstEntered, setFirstEntered] = useState(firstEntered);

  function handleBlur(evt: React.ChangeEvent<HTMLInputElement>) {
    setFirstEntered({
      ...isFirstEntered,
      [`${evt.target.name}`]: false
    });
  }

 function handleValidChange(evt: React.ChangeEvent<HTMLInputElement>) {
   setValid({
     ...valid,
     [`${evt.target.name}`]: evt.target.value !== "" || isFirstEntered[`${evt.target.name}`],
   })
 }

  return {valid, handleValidChange, handleBlur};
}

export default useValidate;