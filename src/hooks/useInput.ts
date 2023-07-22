import React, {useState} from "react";


type valueProps = {
  [index: string]: string,
}

const useInput = (initialValue: valueProps): [valueProps, (evt: React.ChangeEvent<HTMLInputElement>) => void] => {

  const [value, setValue] = useState(initialValue);

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setValue({
      ...value,
      [`${evt.target.name}`]: evt.target.value,
    });
  }

  return [value, handleInputChange];
}

export default useInput;