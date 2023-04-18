import './Window.css';
import MoveBackArrow from "../../back-arrow/MoveBackArrow";
import {useContext, useEffect, useState} from "react";
import {TimerContext} from "../../../contexts/timerContext";
import FirstTimePopup from "../../popups/FirstTimePopup";
import About from "./About";
import {WindowContext} from "../../../contexts/windowContext";
import CalibrationReport from "./CalibrationReport";
import BackgroundReport from "./BackgroundReport";
import ResearchReport from "./ResearchReport";
import Spectre from "./Spectre";

export default function Window (props) {

  const {isDesktopClickedForFirstTime, setDesktopClickedForFirstTime} = useContext(TimerContext);
  const {
    isAboutPageActive, setAboutPageActive,
    isCalibrationReportPageActive, setCalibrationReportPageActive,
    isBackgroundReportPageActive, setBackgroundReportPageActive,
    isResearchReportPageActive, setResearchReportPageActive,
    isSpectrePageActive, setSpectrePageActive,
    isCalibrationReportDone,
    isBackgroundReportDone,
    isResearchReportDone,
    showCalibrationReportNow, setShowCalibrationReportNow,
    showBackgroundReportNow, setShowBackgroundReportNow,
    showResearchReportNow, setShowResearchReportNow
  } = useContext(WindowContext);

  const [isFirstTimePopupOpen, setFirstTimePopup] = useState(isDesktopClickedForFirstTime);

  useEffect(() => {
    //по моему тут можно убрать проверку на done
    if (isCalibrationReportDone && showCalibrationReportNow) {
      // setShowCalibrationReportNow(false);
      props.resetPages();
      setCalibrationReportPageActive(true);
    }
    if (isBackgroundReportDone && showBackgroundReportNow) {
      // setShowBackgroundReportNow(false);
      props.resetPages();
      setBackgroundReportPageActive(true);
    }
    if (isResearchReportDone && showResearchReportNow) {
      // setShowResearchReportNow(false);
      props.resetPages();
      setResearchReportPageActive(true);
    }
  }, [isBackgroundReportDone, isCalibrationReportDone, isResearchReportDone])

  function closePopup () {
    setFirstTimePopup(false);
    setDesktopClickedForFirstTime(false);
  }

  function switchContent () {
    if (isAboutPageActive && !props.isCounterDone) {
      return <About />;
    }
    if (isCalibrationReportPageActive) {
      return <CalibrationReport/>;
    }
    if (isBackgroundReportPageActive) {
      return <BackgroundReport/>;
    }
    if (isResearchReportPageActive) {
      return <ResearchReport />;
    }
    if (isSpectrePageActive) {
      return <Spectre />
    }
  }

  function handleCalibrationReportBtnClick () {
    if (isCalibrationReportDone) {
      props.resetPages();
      setCalibrationReportPageActive(true);
    }
  }

  function handleBackgroundReportBtnClick () {
    if (isBackgroundReportDone) {
      props.resetPages();
      setBackgroundReportPageActive(true);
    }
  }

  function handleResearchReportBtnClick () {
    if (isResearchReportDone) {
      props.resetPages();
      setResearchReportPageActive(true);
    }
  }

  function handleSpectreBtnClick () {
    if (isResearchReportDone) {
      props.resetPages();
      setSpectrePageActive(true);
    }
  }

  return (
    <>
      <FirstTimePopup
        isOpen={isFirstTimePopupOpen}
        onClose={closePopup}
      />
      <section className="Window">
        <MoveBackArrow
          leadingTo={'/display'}
          onClick={props.onLeave}
          isDisabled={isDesktopClickedForFirstTime}
        />
        <div className="Window__container">
          {switchContent()}
          <div className="Window__footer-navbar">
            <button
              type="button"
              className={`Window__footer-button ${isCalibrationReportPageActive ? "Window__footer-button_active" : ""}`}
              onClick={handleCalibrationReportBtnClick}
            >
              Отчет Э.К.
            </button>
            <button
              type="button"
              className={`Window__footer-button ${isBackgroundReportPageActive ? "Window__footer-button_active" : ""}`}
              onClick={handleBackgroundReportBtnClick}
            >
              Отчет И.Ф.
            </button>
            <button
              type="button"
              className={`Window__footer-button ${isResearchReportPageActive ? "Window__footer-button_active" : ""}`}
              onClick={handleResearchReportBtnClick}
            >
              Отчет И.А.
            </button>
            <button
              type="button"
              className={`Window__footer-button ${isSpectrePageActive ? "Window__footer-button_active" : ""}`}
              onClick={handleSpectreBtnClick}
            >
              Спектр
            </button>
          </div>
        </div>
      </section>
    </>
  )
}