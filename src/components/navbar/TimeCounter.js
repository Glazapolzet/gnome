import './TimeCounter.css'
import {useState} from "react";
import DropdownMenu from "./DropdownMenu";
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
        className="TimeCounter__btn"
        onClick={toggleDropdown}
      >
        <div
          className="TimeCounter__clock-icon"
          style={{
            backgroundImage: `url(${clockIco})`
          }}
        />
        <p className="TimeCounter__time">{value}</p>
      </button>
      <div className={`TimeCounter__dropdown ${
        isDropdownVisible
          ? "TimeCounter__dropdown_visible"
          : ""}`}
      >
        <DropdownMenu
          toggleDropdown={toggleDropdown}
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
      </div>
    </>
  )

}

