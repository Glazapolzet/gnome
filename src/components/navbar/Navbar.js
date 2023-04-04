import './Navbar.css';
import { Outlet } from "react-router-dom";
import DropdownNavLink from "./DropdownNavLink";
import Navlink from "./Navlink";
import TimeCounter from "./TimeCounter";
import CalibrationPopup from "../popups/CalibrationPopup";
import BackgroundPopup from "../popups/BackgroundPopup";
import ActivityPopup from "../popups/ActivityPopup";
import beaker from "../../images/beaker-20-solid.svg";
import book from "../../images/book_opened.svg";
import info from "../../images/info.svg";
import {useContext, useState} from "react";
import {FormContext} from "../../formContext/formContext";

export default function Navbar(props) {

  const {isFormOnSubmit} = useContext(FormContext);

  const [isCalibrationPopupOpen, setCalibrationPopupVisibility] = useState(false);
  const [isBackgroundPopupOpen, setBackgroundPopupVisibility] = useState(false);
  const [isActivityPopupOpen, setActivityPopupVisibility] = useState(false);

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

  return (
    <>
      <CalibrationPopup
        isOpen={isCalibrationPopupOpen}
        onClose={closeAllPopups}
        onClick={closeAllPopups}
      />
      <BackgroundPopup
        isOpen={isBackgroundPopupOpen}
        onClose={closeAllPopups}
        onClick={closeAllPopups}
      />
      <ActivityPopup
        isOpen={isActivityPopupOpen}
        onClose={closeAllPopups}
        onClick={closeAllPopups}
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
              isDisabled={!props.isDesktopClicked}
            />
          </li>
          <li className="Navbar__link-wrapper">
            <DropdownNavLink
              icon={beaker}
              isDisabled={!props.isDesktopClicked}
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
        </ul>
        <Outlet />

        <ul className="Navbar__links Navbar__links-right">
          <li className="Navbar__link-wrapper">
            <Navlink
              icon={book}
              leadingTo={"/rad-doc"}
            />
          </li>
        </ul>
      </div>
    </>
  )
}