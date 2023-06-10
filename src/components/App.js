import './App.css';

import { FormContext } from "../contexts/formContext";
import { TimerContext } from "../contexts/timerContext";
import { WindowContext } from "../contexts/windowContext";
import { ContainerContext } from "../contexts/containerContext";
import { SpectreContext } from "../contexts/spectreContext";
import { CaseContext } from "../contexts/caseContext";
import { Route, Routes, useNavigate } from 'react-router-dom';
import {useEffect, useState, lazy, Suspense} from "react";

//Recorder:
import GammaExploring, { PotatoExploringActions } from "../actions/gammaExploring.ts";

import radiometer from "../images/radiometer.jpg";
import desktop from "../images/desktop.jpg";
import spectrometer from "../images/spectrometer.jpg";

import multiradDoc from "../docs/multirad.pdf";
import { TempProvider } from '../contexts/tempContext';
import { TimerProvider } from './navbar/Timer/Timer';

const Main = lazy(() => import("./main/Main"));
const Navbar = lazy(() => import("./navbar/Navbar"));

const StartArea = lazy(() => import("./quiz/StartArea"));
const Display = lazy(() => import("./quiz/Display"));
const DisplayImage = lazy(() => import("./quiz/DisplayImage"));
const Case = lazy(() => import("./sub-displays/table/Case"));
const Table = lazy(() => import("./sub-displays/table/Table"));
const Window = lazy(() => import("./sub-displays/window/Window"));
const Result = lazy(() => import("./result/Result"));
const RadDoc = lazy(() => import("./rad-doc/RadDoc"));

const { invoke } = window.__TAURI__.tauri;

// interface greetProps {
//   name: string;
// }
//
// const greet: greetProps = ({name}) => {
//   invoke('greet', {name: name})
//     // `invoke` returns a Promise
//     .then((response) => console.log(response))
// }

function App() {

  invoke('greet', { name: 'World' })
  // `invoke` returns a Promise
  .then((response) => console.log(response))

  const navigate = useNavigate();

  useEffect(() => {
    const ctrl1 = (e) => (e.ctrlKey && e.key === "r") || (e.metaKey && e.key === "r");

    const ignore = (e) => {
      if (ctrl1(e)) {
        e.preventDefault()
      }
    };

    window.addEventListener("keydown", ignore);

    return () => {
      window.removeEventListener("keydown", ignore);
    };
  }, );

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
  const [userData, setUserData] = useState({
    'name': "",
    'group': ""
  });
  const [isFormOnSubmit, setFormSubmitStatus] = useState(false);
  const [isNavbarBtnsDisabled, setNavbarBtnsDisabled] = useState(true);
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
  });
  const [spectreForm, setSpectreForm] = useState({
    exceedingTheNorm: "Результат превышает значения, указанные в нормативе"
  });
  const [isSpectreOnSubmit, setSpectreOnSubmit] = useState(false);

  //TimerContext:
  const [isDesktopClickedForFirstTime, setDesktopClickedForFirstTime] = useState(true);
  const [isCounterActive, setCounterActive] = useState(false);
  const [targetValue, setTargetValue] = useState(0);
  const [isCounterDone, setCounterDone] = useState(false);

  //CaseContext:
  const [isCaseOpened, setCaseOpened] = useState(false);

  //ContainerContext:
  const [isContainerIn, setContainerIn] = useState(false);
  const [containerContent, setContainerContent] = useState({});
  const [isCalibrationContainerChosen, setCalibrationContainerChosen] = useState(false);
  const [isOrganicContainerChosen, setOrganicContainerChosen] = useState(false);

  //WindowContext:
  const [isAboutPageActive, setAboutPageActive] = useState(false);
  const [isCalibrationReportPageActive, setCalibrationReportPageActive] = useState(false);
  const [isBackgroundReportPageActive, setBackgroundReportPageActive] = useState(false);
  const [isResearchReportPageActive, setResearchReportPageActive] = useState(false);
  const [isSpectrePageActive, setSpectrePageActive] = useState(false);

  const [isCalibrationReportDone, setCalibrationReportDone] = useState(false);
  const [isBackgroundReportDone, setBackgroundReportDone] = useState(false);
  const [isResearchReportDone, setResearchReportDone] = useState(false);

  const [showCalibrationReportNow, setShowCalibrationReportNow] = useState(false);
  const [showBackgroundReportNow, setShowBackgroundReportNow] = useState(false);
  const [showResearchReportNow, setShowResearchReportNow] = useState(false);

  const [shouldResetNormsConclusion, setShouldResetNormsConclusion] = useState(false);

  //SpectreContext:
  function getRandomValue (min, max, dec=4) {
    const str = (Math.random() * (max - min) + min).toFixed(dec);

    return parseFloat(str);
  }

  function getKeyValue (borderValue) {
    if (Math.random() > 0.6) {
      return getRandomValue(borderValue, 1000, 0);
    }

    return getRandomValue(1, borderValue, 0);
  }

  const [elements, setElements] = useState({});

  function generateElements() {
    setElements({
      cs: `${getKeyValue(121)} +- ${getRandomValue(0, 5)} Бк/кг`,
      st: `${getKeyValue(41)} +- ${getRandomValue(0, 5)} Бк/кг`,
      th: `${getRandomValue(0, 50)} +- ${getRandomValue(0, 10)} Бк/кг`,
      k: `${getRandomValue(0, 50, 0)} +- ${getRandomValue(0, 10, 0)} Бк/кг`
    })
  }

  function handlePcClick () {
    if (!GammaExploring.check_action_added(PotatoExploringActions.ENABLE_PC)) {
      GammaExploring.add_action(PotatoExploringActions.ENABLE_PC);
    }
    navigate('/display');
  }

  function handleDesktopClick () {
    if (!GammaExploring.check_action_added(PotatoExploringActions.ENABLE_PROGRAM)) {
      GammaExploring.add_action(PotatoExploringActions.ENABLE_PROGRAM);
    }
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
    setSpectrePageActive(false);
  }

  return (
    <WindowContext.Provider value={{
      isAboutPageActive, setAboutPageActive,
      isCalibrationReportPageActive, setCalibrationReportPageActive,
      isBackgroundReportPageActive, setBackgroundReportPageActive,
      isResearchReportPageActive, setResearchReportPageActive,
      isSpectrePageActive, setSpectrePageActive,
      isCalibrationReportDone, setCalibrationReportDone,
      isBackgroundReportDone, setBackgroundReportDone,
      isResearchReportDone, setResearchReportDone,
      showCalibrationReportNow, setShowCalibrationReportNow,
      showBackgroundReportNow, setShowBackgroundReportNow,
      showResearchReportNow, setShowResearchReportNow,
      shouldResetNormsConclusion, setShouldResetNormsConclusion,
      resetPages
    }}>
      <TempProvider>
      <TimerProvider>
      <FormContext.Provider value={{
        userData, setUserData,
        isFormOnSubmit, setFormSubmitStatus,
        isNavbarBtnsDisabled, setNavbarBtnsDisabled,
        isCalibrationPending, setCalibrationPending,
        isBackgroundPending, setBackgroundPending,
        isActivityPending, setActivityPending,
        backgroundForm, setBackgroundForm,
        activityForm, setActivityForm,
        spectreForm, setSpectreForm,
        isSpectreOnSubmit, setSpectreOnSubmit
      }}>
        <TimerContext.Provider value={{
          isDesktopClickedForFirstTime, setDesktopClickedForFirstTime,
          isCounterActive, setCounterActive,
          targetValue, setTargetValue,
          isCounterDone, setCounterDone,
        }}>
          <CaseContext.Provider value={{
            isCaseOpened, setCaseOpened
          }}>
            <ContainerContext.Provider value={{
              isContainerIn, setContainerIn,
              containerContent, setContainerContent,
              isCalibrationContainerChosen, setCalibrationContainerChosen,
              isOrganicContainerChosen, setOrganicContainerChosen
            }}>
              <SpectreContext.Provider value={{
                elements, generateElements
              }}>
                <div className="App">

                  <Navbar
                    isDesktopClicked={isDesktopClicked}
                    resetPages={resetPages}
                  />

                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/quiz" element={<StartArea onClick={handlePcClick} />} />
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
                        dotY={160}
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
                    <Route path="/rad-doc" element={<RadDoc file={multiradDoc} />} />
                    <Route path="/result" element={<Result />} />
                  </Routes>
                </div>
              </SpectreContext.Provider>
            </ContainerContext.Provider>
          </CaseContext.Provider>
        </TimerContext.Provider>
      </FormContext.Provider>
      </TimerProvider>
      </TempProvider>
    </WindowContext.Provider>
  );
}

export default App;
