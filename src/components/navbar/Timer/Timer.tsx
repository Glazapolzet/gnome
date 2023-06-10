
import Dropdown from '../Dropdown';
import './TimeCounter.css'
import {FC, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import clockIco from "../../../images/clock.svg";

export type TimerFormat = "sec" | "min"

export type TimerOpts = {
  isActive: boolean,
  isActionsDisabled: boolean,
  bitrate: number,
  time: number,
  format: TimerFormat,
}

export interface TimerContextProps {
  opts: TimerOpts,
  done: boolean,
  setOpts: (val: TimerOpts) => void,
  setDone: (val: boolean) => void,
}

export interface TimerProviderProps {
  children: ReactNode
}

export const TimerContext = createContext<TimerContextProps>({
  opts: {
    isActive: false,
    isActionsDisabled: true,
    bitrate: 0,
    time: 0,
    format: "sec"
  },
  done: false,
  setOpts: () => {},
  setDone: () => {}
})

export const TimerProvider: FC<TimerProviderProps> = ({ children }) => {
  const [opts, setOpts] = useState(
    {
      isActive: false,
      isActionsDisabled: true,
      bitrate: 0,
      time: 0,
      format: "sec" as TimerFormat
    }
  )
  const [done, setDone] = useState(false);

  const value = useMemo(
      () =>{ 
        return {
          opts: opts, 
          done: done,
          setDone: setDone,
          setOpts: setOpts,
        }
      }, 
      [opts, done]
  )

  return (
      <TimerContext.Provider value={value}> 
          {children}
      </TimerContext.Provider>
  )
}


const useTimerOpts = (): [boolean, boolean, number, number, TimerFormat, (val: boolean) => void]=> {
    const {opts, setDone} = useContext(TimerContext)
    return [
        opts.isActive,
        opts.isActionsDisabled,
        opts.bitrate,
        opts.time,
        opts.format,
        setDone 
    ]
}

export const useTimer = (): [TimerOpts, boolean, (val: TimerOpts) => void] => {
    const {opts, done, setOpts} = useContext(TimerContext)
    return [
        opts,
        done,
        setOpts,
    ]
}

export const Timer: FC = () => {
    const [isPending, isDisabled, bitrate, target, format,  setDone] = useTimerOpts();
    if (isPending) {
      setDone(false)
    }
    
    
    const [isActive, setActive] = useState(true);
    const [ticker, setTick] = useState(0);
    const [isDropdownVisible, setDropdownVisibility] = useState(false);

    function toggleDropdown() {
      setDropdownVisibility(!isDropdownVisible);
    }

    function start() {
        setActive(true);
    }

    function stop() {
        setActive(false);
    }

    const tick = useCallback(() => {
      if (isPending && ticker === target) {
        setDone(true)
        setActive(false)
        return;
      }

      if (isActive && isPending) {
        setTick(ticker + 1);
      }
    }, [ticker, isPending, target, isActive,  setDone]);

    useEffect(() => {
      const interval = setInterval(tick, bitrate);
      
      return () => clearInterval(interval);
    }, [tick, bitrate]);
  
    return (
      <>
        <button
          type="button"
          className={`TimeCounter__btn ${isDisabled ? "TimeCounter__btn_disabled" : ""}`}
          onClick={toggleDropdown}
          disabled={isDisabled}
        >
          <div
            className="TimeCounter__clock-icon"
            style={{
              backgroundImage: `url(${clockIco})`
            }}
          />
            <p className="TimeCounter__time">{ticker + format }</p>
        </button>
        <Dropdown
          toggleDropdown={toggleDropdown}
          isDropdownVisible={isDropdownVisible}
          content={[
          {
            id: "start-counter",
            title: 'Пуск',
            handler: start
          },
          {
            id: "stop-counter",
            title: 'Стоп',
            handler: stop
          }
          ]}
        />
      </>
    )
  }