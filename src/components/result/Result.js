import './Result.css';
import { data } from '../../utils/answerChart';
import { Doughnut } from 'react-chartjs-2';
import {useState} from "react";
import tick from "../../images/tick.svg";
import cross from "../../images/cross_red.svg";

export default function Result () {

  const [havePassed, setHavePassed] = useState(false);
  const [rightAnswersNum, setRightAnswersNum] = useState(0);
  const [resultMessage, setResultMessage] = useState(`тест ${havePassed ? "сдан" : "не сдан"}`);

  return (
    <div className="Result">
      <h2 className="Result__title">Результат</h2>
      <div className="Result__answer-chart-wrapper">
        <div className={`Result__icon ${havePassed ? "Result__icon_tick" : "Result__icon_cross"}`} style={{
          backgroundImage: `url(${havePassed ? tick : cross})`,
        }}/>
        <Doughnut data={data} />
      </div>
      <h3 className="Result__description">Вы совершили {rightAnswersNum} верных действий из 10</h3>
      <p className="Result__info" style={{
        color: havePassed ? "rgb(54,235,57)" : "rgb(255,99,132)"
      }}>
        {resultMessage}
      </p>
    </div>
  )
}