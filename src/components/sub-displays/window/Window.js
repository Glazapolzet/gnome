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

import ecReport from "../../../docs/EC_report.pdf";
import bgReport from "../../../docs/BG_report.pdf";
import acReport from "../../../docs/AC_report.pdf";
import radNorms from "../../../docs/Rad_norms.pdf";

import ecSpectre from "../../../images/EC_spectre.png";
import bgSpectre from "../../../images/BG_spectre.png";
import acSpectre from "../../../images/AC_spectre.png";

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
    showCalibrationReportNow,
    showBackgroundReportNow,
    showResearchReportNow,
    setShouldResetNormsConclusion
  } = useContext(WindowContext);

  const [isFirstTimePopupOpen, setFirstTimePopup] = useState(isDesktopClickedForFirstTime);


  useEffect(() => {
    if (isCalibrationReportDone && showCalibrationReportNow) {
      props.resetPages();
      setCalibrationReportPageActive(true);
    }
    if (isBackgroundReportDone && showBackgroundReportNow) {
      props.resetPages();
      setBackgroundReportPageActive(true);
    }
    if (isResearchReportDone && showResearchReportNow) {
      props.resetPages();
      setResearchReportPageActive(true);
      setShouldResetNormsConclusion(true);
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
      return <CalibrationReport file={ecReport} image={ecSpectre}/>;
    }
    if (isBackgroundReportPageActive) {
      return <BackgroundReport file={bgReport} image={bgSpectre}/>;
    }
    if (isResearchReportPageActive) {
      return <ResearchReport file={acReport} image={acSpectre} />;
    }
    if (isSpectrePageActive) {
      return <Spectre file={radNorms} />
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