import './TimeCounter.css'
import {useContext, useEffect, useState} from "react";
import Dropdown from "./Dropdown";
import clockIco from "../../images/clock.svg";
import {TimerContext} from "../../contexts/timerContext";
import {WindowContext} from "../../contexts/windowContext";
import {FormContext} from "../../contexts/formContext";

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
  const {setAboutPageActive} = useContext(WindowContext);

  const isDisabled = props.isDisabled;

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

    if (isCalibrationPending) {
      setCalibrationPending(false);
    }
    if (isBackgroundPending) {
      setBackgroundPending(false);
    }
    if (isActivityPending) {
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
      if (tick < targetValue) {
        setTick((s) => s+1);
      }
      if (tick === targetValue) {
        resetDeps();
      }
    }
    const interval = setInterval(countByPopupHandler, props.interval);

    return () => clearInterval(interval);
  }, [targetValue, isCounterActive, isDisabled, tick, setCounterDone, resetDeps, props.interval])

  function stopCounter () {
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

