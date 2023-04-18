import './TimeCounter.css'
import {useContext, useEffect, useState} from "react";
import Dropdown from "./Dropdown";
import clockIco from "../../images/clock.svg";
import {TimerContext} from "../../contexts/timerContext";
import {WindowContext} from "../../contexts/windowContext";
import {FormContext} from "../../contexts/formContext";
import {SpectreContext} from "../../contexts/spectreContext";
import GammaExploring, { PotatoExploringActions } from "../../actions/gammaExploring.ts";

export default function TimeCounter (props) {

  const [tick, setTick] = useState(0);
  const [value, setValue] = useState(0);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const {
    isCalibrationPending,
    setCalibrationPending,
    isBackgroundPending,
    setBackgroundPending,
    isActivityPending,
    setActivityPending
  } = useContext(FormContext);

  const {
    isCounterActive,
    setCounterActive,
    targetValue,
    setTargetValue,
    setCounterDone
  } = useContext(TimerContext);

  const {
    setAboutPageActive,
    setCalibrationReportDone,
    setBackgroundReportDone,
    setResearchReportDone,
    showCalibrationReportNow, setShowCalibrationReportNow,
    showBackgroundReportNow, setShowBackgroundReportNow,
    showResearchReportNow, setShowResearchReportNow,
    resetPages
  } = useContext(WindowContext);

  const {setElements, getRandomVal} = useContext(SpectreContext);

  const isDisabled = props.isDisabled;

  function regenerateElements () {
    setElements({
      cs: `${getRandomVal(-10, 0)} +- ${getRandomVal(0, 10)} Бк/кг`,
      rs: `${getRandomVal(-10, 0)} +- ${getRandomVal(0, 10)} Бк/кг`,
      th: `${getRandomVal(-10, 0)} +- ${getRandomVal(0, 10)} Бк/кг`,
      k: `${getRandomVal(0, 50, 0)} +- ${getRandomVal(70, 130, 0)} Бк/кг`
    })
  }

  function toggleDropdown() {
    setDropdownVisibility(!isDropdownVisible);
  }

  function resetDeps () {
    setCounterActive(false);
    setValue(targetValue);
    setTick(0);
    setTargetValue(0);
    setCounterDone(true);
    setAboutPageActive(false);
  }

  function resetReports () {
    setShowCalibrationReportNow(false);
    setShowBackgroundReportNow(false);
    setShowResearchReportNow(false);
  }

  function showReport () {
    if (isCalibrationPending) {
      setCalibrationReportDone(true);
      setShowCalibrationReportNow(true);
      setCalibrationPending(false);
    }
    if (isBackgroundPending) {
      setBackgroundReportDone(true);
      setShowBackgroundReportNow(true);
      setBackgroundPending(false);
    }
    if (isActivityPending) {
      regenerateElements();
      setResearchReportDone(true);
      setShowResearchReportNow(true);
      setActivityPending(false);
    }
  }

  useEffect(() => {
    if (isDisabled) {
      setValue(0);
    }
  }, [isDisabled])

  useEffect(() => {
    if (!isCounterActive && tick !== 0) {
      setValue(tick);
    }

    function countByPopupHandler () {
      if (isDisabled || !isCounterActive || !targetValue) {
        return
      }

      setCounterDone(false);
      resetPages();
      resetReports();

      if (tick < targetValue) {
        setTick((s) => s+1);
      }
      if (tick === targetValue) {
        resetDeps();
        showReport();
      }
    }
    const interval = setInterval(countByPopupHandler, props.interval);

    return () => clearInterval(interval);
  }, [targetValue, isCounterActive, isDisabled, tick, setCounterDone, resetDeps, props.interval])

  function checkReport () {
    if (showCalibrationReportNow) {
      GammaExploring.add_action(PotatoExploringActions.STOP_TIMER_FOR_C_POPUP);
    }
    if (showBackgroundReportNow) {
      GammaExploring.add_action(PotatoExploringActions.STOP_TIMER_FOR_B_POPUP);
    }
    if (showResearchReportNow) {
      GammaExploring.add_action(PotatoExploringActions.STOP_TIMER_FOR_A_POPUP);
    }
    //то же самое для is_пендингов, но с пенальти 0.7-0.8 на случай если человек остановит таймер, не подождав конца отсчета
    // (хз слишком жестоко это или нет, поэтому пока тут ничего нет)
    else {

    }
  }

  function stopCounter () {
    checkReport();
    // console.log(showCalibrationReportNow, showBackgroundReportNow, showResearchReportNow);
    setCounterActive(false);
  }

  function startCounter () {
    if (!isCounterActive && tick !== targetValue) {
      setCounterActive(true);
    }
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
        {props.inMinutes ? (
            <p className="TimeCounter__time">{isCounterActive ? tick + ' мин' : value + ' мин'}</p>
          ) : (
            <p className="TimeCounter__time">{isCounterActive ? tick + ' с' : value + ' с'}</p>
          )}
      </button>
      <Dropdown
        toggleDropdown={toggleDropdown}
        isDropdownVisible={isDropdownVisible}
        content={[
        {
          id: "start-counter",
          title: 'Пуск',
          handler: startCounter
        },
        {
          id: "stop-counter",
          title: 'Стоп',
          handler: stopCounter
        }
        ]}
      />
    </>
  )

}

