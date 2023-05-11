import './Result.css';
import '../../utils/answerChart';
import { Doughnut } from 'react-chartjs-2';
import {useContext, useEffect, useState} from "react";
import tick from "../../images/tick.svg";
import cross from "../../images/cross_red.svg";
import GammaExploring from "../../actions/gammaExploring.ts";
import {FormContext} from "../../contexts/formContext";

export default function Result () {

  const { userData } = useContext(FormContext);

  const [havePassed, setHavePassed] = useState(false);
  const [resultMessage, setResultMessage] = useState("тест не сдан");

  const [score, total] = [GammaExploring.getScore(), GammaExploring.getTotalAvailableScore()];

  useEffect(() => {
    if (score > total/2) {
      setHavePassed(true);
      setResultMessage("тест сдан");
    }
  }, [])

  return (
    <div className="Result">
      <h2 className="Result__title">Результаты тестирования</h2>
      <p className="Result__info">{userData.name} {userData.group}</p>
      <div className="Result__answer-chart-wrapper">
        <div className={`Result__icon ${havePassed ? "Result__icon_tick" : "Result__icon_cross"}`} style={{
          backgroundImage: `url(${havePassed ? tick : cross})`,
        }}/>
        <Doughnut data={{
            labels: ['Неверно', 'Верно'],
            datasets: [
              {
                label: 'Баллы за действия',
                data: [total-score, score],
                backgroundColor: [
                  'rgb(255,99,132)',
                  'rgb(54,235,57)',
                ],
              },
            ],
        }} />
      </div>
      <h3 className="Result__description">
        Вы набрали {score} баллов из {total} возможных
      </h3>
      <p className="Result__info" style={{
        color: havePassed ? "rgb(54,235,57)" : "rgb(255,99,132)"
      }}>
        {resultMessage}
      </p>
    </div>
  )
}