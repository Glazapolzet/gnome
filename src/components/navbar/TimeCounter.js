import './TimeCounter.css'
import {useState} from "react";
import Dropdown from "./Dropdown";
import clockIco from "../../images/clock.svg";

export default function TimeCounter (props) {

  const [value, setValue] = useState(0);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  function toggleDropdown() {
    setDropdownVisibility(!isDropdownVisible);
  }

  return (
    <>
      <button
        type="button"
        className={`TimeCounter__btn ${props.isDisabled ? "TimeCounter__btn_disabled" : ""}`}
        onClick={toggleDropdown}
        disabled={props.isDisabled}
      >
        <div
          className="TimeCounter__clock-icon"
          style={{
            backgroundImage: `url(${clockIco})`
          }}
        />
        <p className="TimeCounter__time">{value}</p>
      </button>
      <Dropdown
        toggleDropdown={toggleDropdown}
        isDropdownVisible={isDropdownVisible}
        content={[
        {
          id: 1,
          title: 'Пуск',
          handler: () => console.log('working!1')
        },
        {
          id: 2,
          title: 'Стоп',
          handler: () => console.log('working!2')
        }
        ]}
      />
    </>
  )

}

