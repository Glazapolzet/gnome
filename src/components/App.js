import './App.css';

import { FormContext } from "../contexts/formContext";
import { TimerContext } from "../contexts/timerContext";
import { WindowContext } from "../contexts/windowContext";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

import Main from "./main/Main";
import StartArea from "./quiz/StartArea";
import Navbar from "./navbar/Navbar";

import Display from "./quiz/Display";
import DisplayImage from "./quiz/DisplayImage";
import radiometer from "../images/radiometer.jpg";
import desktop from "../images/desktop.jpg";
import spectrometer from "../images/spectrometer.jpg";
import Doc from "./rad-doc/Doc";
import multiradDoc from "../docs/multirad.pdf";

import Case from "./sub-displays/table/Case";
import Table from "./sub-displays/table/Table";
import Window from "./sub-displays/window/Window";
import Result from "./result/Result";

function App() {

  const navigate = useNavigate();

  // useEffect(() => {
  //   function showClickCoord(evt) {
  //     console.log(`x: ${evt.screenX} y: ${evt.screenY-65}`);
  //   }
  //
  //   document.addEventListener('click', showClickCoord);
  //   return () => {
  //     document.removeEventListener('click', showClickCoord);
  //   }
  // })

  const [isDesktopClicked, setDesktopClicked] = useState(false);

  //FormContext:
  const [isFormOnSubmit, setFormSubmitStatus] = useState(false);
  const [isCalibrationPending, setCalibrationPending] = useState(false);
  const [isActivityPending, setActivityPending] = useState(false);
  const [activityForm, setActivityForm] = useState({
    probeCode: "",
    probeName: "",
    probeDate: "",
    probeType: "Прочие",
    probeMethod: "Натив",
    probeWeight: "1000",
    geometry: "Точка_14мм",
    rnConsistency: "137Cs_и_ЕРН",
    exposition: 3600,
    trials: "1"
  });
  const [isBackgroundPending, setBackgroundPending] = useState(false);
  const [backgroundForm, setBackgroundForm] = useState({
    averaging: "0.4",
    exposition: 1800
  })

  //TimerContext:
  const [isDesktopClickedForFirstTime, setDesktopClickedForFirstTime] = useState(true);
  const [isCounterActive, setCounterActive] = useState(false);
  const [targetValue, setTargetValue] = useState(0);
  const [isCounterDone, setCounterDone] = useState(false);

  //WindowContext:
  const [isAboutPageActive, setAboutPageActive] = useState(false);
  const [isCalibrationReportPageActive, setCalibrationReportPageActive] = useState(false);
  const [isBackgroundReportPageActive, setBackgroundReportPageActive] = useState(false);
  const [isResearchReportPageActive, setResearchReportPageActive] = useState(false);

  const [isCalibrationReportDone, setCalibrationReportDone] = useState(false);
  const [isBackgroundReportDone, setBackgroundReportDone] = useState(false);
  const [isResearchReportDone, setResearchReportDone] = useState(false);

  const [showCalibrationReportNow, setShowCalibrationReportNow] = useState(false);
  const [showBackgroundReportNow, setShowBackgroundReportNow] = useState(false);
  const [showResearchReportNow, setShowResearchReportNow] = useState(false);

  function handleDesktopClick () {
    setDesktopClicked(true);
    setAboutPageActive(true);
    navigate('/window');
  }

  function handleWindowLeave () {
    setDesktopClicked(false);
  }

  function resetPages () {
    setAboutPageActive(false);
    setCalibrationReportPageActive(false);
    setBackgroundReportPageActive(false);
    setResearchReportPageActive(false);
  }

  return (
    <WindowContext.Provider value={{
      isAboutPageActive, setAboutPageActive,
      isCalibrationReportPageActive, setCalibrationReportPageActive,
      isBackgroundReportPageActive, setBackgroundReportPageActive,
      isResearchReportPageActive, setResearchReportPageActive,
      isCalibrationReportDone, setCalibrationReportDone,
      isBackgroundReportDone, setBackgroundReportDone,
      isResearchReportDone, setResearchReportDone,
      showCalibrationReportNow, setShowCalibrationReportNow,
      showBackgroundReportNow, setShowBackgroundReportNow,
      showResearchReportNow, setShowResearchReportNow
    }}>
      <FormContext.Provider value={{
        isFormOnSubmit, setFormSubmitStatus,
        isCalibrationPending, setCalibrationPending,
        isBackgroundPending, setBackgroundPending,
        isActivityPending, setActivityPending,
        backgroundForm, setBackgroundForm,
        activityForm, setActivityForm
      }}>
        <TimerContext.Provider value={{
          isDesktopClickedForFirstTime, setDesktopClickedForFirstTime,
          isCounterActive, setCounterActive,
          targetValue, setTargetValue,
          isCounterDone, setCounterDone,
        }}>
          <div className="App">
            <Navbar
              isDesktopClicked={isDesktopClicked}
              resetPages={resetPages}
            />

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/quiz" element={<StartArea />} />
              <Route path="/display" element={<Display
                backArrowTo={'/quiz'}
                defaultPicIndex={1}
                pics={[
                  "radiometer",
                  "desktop",
                  "spectrometer"
                ]}/>}
              >
                <Route path="radiometer" element={<DisplayImage
                  pic={radiometer}
                  withDot={false}
                />}/>

                <Route path="desktop" element={<DisplayImage
                  pic={desktop}
                  withDot={true}
                  dotX={255}
                  dotY={45}
                  dotDropdown={[
                    {
                      id: "start-app",
                      title: 'Запуск ПО «Прогресс»',
                      handler: handleDesktopClick
                    },
                  ]}
                />}/>

                <Route path="spectrometer" element={<DisplayImage
                  pic={spectrometer}
                  withDot={true}
                  dotLeadingTo={'/spec-area'}
                  dotX={935}
                  dotY={10}
                />}/>
              </Route>

              {/*TODO: сделать норм фотку стола*/}
              <Route path={'/spec-area'} element={<Display
                backArrowTo={'/display'}
                defaultPicIndex={0}
                pics={[
                  "case-closed",
                  "table",
                ]}/>}>

                <Route path="case-closed" element={<Case
                  dotX={820}
                  dotY={320}
                />}/>

                <Route path="table" element={<Table
                  dotX={900}
                  dotY={300}
                />}/>

              </Route>
              <Route path="/window" element={<Window
                onLeave={handleWindowLeave}
                resetPages={resetPages}
                isCounterDone = {isCounterDone}
                isCalibrationReportDone = {isCalibrationReportDone}
                isBackgroundReportDone = {isBackgroundReportDone}
                isResearchReportDone = {isResearchReportDone}
              />} />
              <Route path="/rad-doc" element={<Doc link={multiradDoc} />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </div>
        </TimerContext.Provider>
      </FormContext.Provider>
    </WindowContext.Provider>
  );
}

export default App;
