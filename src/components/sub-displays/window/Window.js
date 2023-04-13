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

export default function Window (props) {

  const {isDesktopClickedForFirstTime, setDesktopClickedForFirstTime} = useContext(TimerContext);
  const {
    isAboutPageActive,
    setAboutPageActive,
    isCalibrationReportPageActive,
    setCalibrationReportPageActive,
    isBackgroundReportPageActive,
    setBackgroundReportPageActive,
    isResearchReportPageActive,
    setResearchReportPageActive
  } = useContext(WindowContext);

  const [isFirstTimePopupOpen, setFirstTimePopup] = useState(isDesktopClickedForFirstTime);

  useEffect(() => {
    if (isCalibrationReportPageActive && props.isCounterDone) {
      props.onCalibrationReportDone();
    }
    if (isBackgroundReportPageActive && props.isCounterDone) {
      props.onBackgroundReportDone();
    }
    if (isResearchReportPageActive && props.isCounterDone) {
      props.onResearchReportDone();
    }
  }, [isBackgroundReportPageActive, isCalibrationReportPageActive, isResearchReportPageActive, props])

  function closePopup () {
    setFirstTimePopup(false);
    setDesktopClickedForFirstTime(false);
  }

  function switchContent () {
    if (isAboutPageActive && !props.isCounterDone) {
      return <About />;
    }
    if (isCalibrationReportPageActive && props.isCounterDone) {
      return <CalibrationReport/>;
    }
    if (isBackgroundReportPageActive && props.isCounterDone) {
      return <BackgroundReport/>;
    }
    if (isResearchReportPageActive && props.isCounterDone) {
      return <ResearchReport />;
    }
  }

  function handleCalibrationReportBtnClick () {
    if (props.isCalibrationReportDone) {
      props.resetPages();
      setCalibrationReportPageActive(true);
    }
  }

  function handleBackgroundReportBtnClick () {
    if (props.isBackgroundReportDone) {
      props.resetPages();
      setBackgroundReportPageActive(true);
    }
  }

  function handleResearchReportBtnClick () {
    if (props.isResearchReportDone) {
      props.resetPages();
      setResearchReportPageActive(true);
    }
  }

  return (
    <>
      <FirstTimePopup
        isOpen={isFirstTimePopupOpen}
        onClose={closePopup}
        onClick={closePopup}
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
            <button type="button" className="Window__footer-button">
              Спектр
            </button>
          </div>
        </div>
      </section>
    </>
  )
}