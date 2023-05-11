import './Navbar.css';
import {useNavigate} from "react-router-dom";
import DropdownNavLink from "./DropdownNavLink";
import Navlink from "./Navlink";
import TimeCounter from "./TimeCounter";
import CalibrationPopup from "../popups/CalibrationPopup";
import BackgroundPopup from "../popups/BackgroundPopup";
import ActivityPopup from "../popups/ActivityPopup";
import beaker from "../../images/beaker-20-solid.svg";
import info from "../../images/info.svg";
import {useContext, useEffect, useState} from "react";
import {FormContext} from "../../contexts/formContext";
import {TimerContext} from "../../contexts/timerContext";

export default function Navbar(props) {

  const navigate = useNavigate();

  //activityForm.exposition, backgroundForm.exposition
  const {
    isFormOnSubmit,
    isNavbarBtnsDisabled, setNavbarBtnsDisabled,
    activityForm, backgroundForm
  } = useContext(FormContext);

  const {setCounterActive, setTargetValue} = useContext(TimerContext);

  const [popupsOpenStatus, setPopupsOpenStatus] = useState({
    'calibration': false,
    'background': false,
    'activity': false
  });

  const [withMinutes, setWithMinutes] = useState(false);
  const [timerInterval, setTimerInterval] = useState(0);

  function closeAllPopups() {
    setPopupsOpenStatus({
      'calibration': false,
      'background': false,
      'activity': false
    })
  }

  function handleBtnClick(evt) {
    console.log(evt.target);
    setPopupsOpenStatus({
      ...popupsOpenStatus,
      [`${evt.target.id}`]: true,
    })
  }

  function setCounter(interval, targetValue, inMinutes= false) {
    setTimerInterval(interval);
    setWithMinutes(inMinutes);
    setTargetValue(targetValue);
    setCounterActive(true);
  }

  function handleCalibrationPopupClick () {
    setCounter(60, 150);
    closeAllPopups();
  }

  function handleBackgroundPopupClick () {
    setCounter(150, 30, true)
    closeAllPopups();
  }

  function handleActivityPopupClick () {
    setCounter(150, 30, true)
    closeAllPopups();
  }

  function handleResultClick (evt) {
    evt.preventDefault();
    setNavbarBtnsDisabled(true);
    navigate("/result");
  }

  useEffect(() => {
    if (isFormOnSubmit) {
      setNavbarBtnsDisabled(false);
    }
  }, [isFormOnSubmit])

  return (
    <>
      <CalibrationPopup
        isOpen={popupsOpenStatus.calibration}
        onClose={closeAllPopups}
        onClick={handleCalibrationPopupClick}
      />
      <BackgroundPopup
        isOpen={popupsOpenStatus.background}
        onClose={closeAllPopups}
        onClick={handleBackgroundPopupClick}
      />
      <ActivityPopup
        isOpen={popupsOpenStatus.activity}
        onClose={closeAllPopups}
        onClick={handleActivityPopupClick}
      />

      <div className="Navbar">
        <ul className="Navbar__links Navbar__links-left">
          <li className="Navbar__link-wrapper">
            <Navlink
              title={"Меню"}
              leadingTo={"/"}
              isDisabled={isFormOnSubmit}
            />
          </li>
          <li className="Navbar__link-wrapper">
            <TimeCounter
              //проверяет, доступна ли иконка часиков для нажатия
              isDisabled={!props.isDesktopClicked || isNavbarBtnsDisabled}
              inMinutes={withMinutes}
              interval={timerInterval}
            />
          </li>
          <li className="Navbar__link-wrapper">
            <DropdownNavLink
              icon={beaker}
              isDisabled={!props.isDesktopClicked || isNavbarBtnsDisabled}
              dropdown={[
                //TODO: возможно понадобится, но вроде как уже есть измерение активности
                // {
                //   id: 1,
                //   title: 'Классификатор продукции',
                //   handler: () => console.log('working!3')
                // },
                {
                  id: "calibration",
                  title: 'Энергетическая калибровка',
                  handler: handleBtnClick
                },
                {
                  id: "background",
                  title: 'Измерение фона',
                  handler: handleBtnClick
                },
                {
                  id: "activity",
                  title: 'Измерение активности',
                  handler: handleBtnClick
                }
              ]}
            />
          </li>
          <li className="Navbar__link-wrapper">
            <Navlink
              icon={info}
              leadingTo={"/rad-doc"}
            />
          </li>
        </ul>

        <div className="Navbar__icon"></div>

        <ul className="Navbar__links Navbar__links-right">
          <li className="Navbar__link-wrapper">
            <Navlink
              title={"Завершить"}
              leadingTo={"/result"}
              isDisabled={!isFormOnSubmit}
              onClick={handleResultClick}
            />
          </li>
        </ul>
      </div>
    </>
  )
}