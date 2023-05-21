import Doc from "../../rad-doc/Doc";
import './Report.css';
import {useState} from "react";

export default function Report (props) {

  const [showReport, setShowReport] = useState(false);

  function handleClick () {
    setShowReport(!showReport);
  }

  function switchContent () {
    switch (showReport) {
      case false:
        return (
          <>
            {props.children}
            <button className={'Report__button'} type={'button'} onClick={handleClick}>Посмотреть полный отчет</button>
          </>
        )
      case true:
        return (
          <>
            <button className={'Report__button'} type={'button'} onClick={handleClick}>Свернуть</button>
            <Doc file={props.file}></Doc>
          </>
        )
      default:
        return
    }
  }

  return (
    <div className={'Report'}>
      <h2 className={'Report__title'}>{props.title}</h2>
      {switchContent()}
    </div>
  )
}