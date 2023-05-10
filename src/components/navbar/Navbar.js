import './Navbar.css';
import {Outlet, useNavigate} from "react-router-dom";
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
  const {isFormOnSubmit, isNavbarBtnsDisabled, setNavbarBtnsDisabled, activityForm, backgroundForm} = useContext(FormContext);
  const {setCounterActive, setTargetValue} = useContext(TimerContext);

  const [isCalibrationPopupOpen, setCalibrationPopupVisibility] = useState(false);
  const [isBackgroundPopupOpen, setBackgroundPopupVisibility] = useState(false);
  const [isActivityPopupOpen, setActivityPopupVisibility] = useState(false);

  const [withMinutes, setWithMinutes] = useState(false);
  const [timerInterval, setTimerInterval] = useState(0);

  function closeAllPopups() {
    setCalibrationPopupVisibility(false);
    setBackgroundPopupVisibility(false);
    setActivityPopupVisibility(false);
  }

  function handleCalibrationBtnClick() {
    setCalibrationPopupVisibility(true);
  }

  function handleBackgroundBtnClick() {
    setBackgroundPopupVisibility(true);
  }

  function handleActivityBtnClick() {
    setActivityPopupVisibility(true)
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
        isOpen={isCalibrationPopupOpen}
        onClose={closeAllPopups}
        onClick={handleCalibrationPopupClick}
      />
      <BackgroundPopup
        isOpen={isBackgroundPopupOpen}
        onClose={closeAllPopups}
        onClick={handleBackgroundPopupClick}
      />
      <ActivityPopup
        isOpen={isActivityPopupOpen}
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
                  id: 2,
                  title: 'Энергетическая калибровка',
                  handler: handleCalibrationBtnClick
                },
                {
                  id: 3,
                  title: 'Измерение фона',
                  handler: handleBackgroundBtnClick
                },
                {
                  id: 4,
                  title: 'Измерение активности',
                  handler: handleActivityBtnClick
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

        {/*<Outlet />*/}

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