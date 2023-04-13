import './Case.css'
import ActionDot from "../../action-dot/ActionDot";
import {useState} from "react";
import caseClosed from "../../../images/case_closed.jpg";
import caseOpened from "../../../images/case_opened.jpg";
import caseWithContainer from "../../../images/case_with-container.jpg";

export default function Case (props) {

  const [isCaseOpen, setCaseOpen] = useState(false);
  const [isCaseWithContainer, setCaseWithContainer] = useState(false);
  const [isContainer, setContainer] = useState(false);

  function openCase () {
    if (isContainer) {
      setCaseWithContainer(true);
    }
    else {
      setCaseOpen(true);
    }
  }

  function closeCase () {
    setCaseOpen(false);
  }

  function addContainer () {
    setContainer(true);
    setCaseWithContainer(true);
  }

  function removeContainer () {
    setContainer(false);
    setCaseWithContainer(false);
    setCaseOpen(true);
  }

  function closeCaseWithContainer () {
    setCaseOpen(false);
    setCaseWithContainer(false);
  }

  return (
    <>
      {isCaseWithContainer ? (
        <>
          <img
            className="Case"
            src={caseWithContainer}
            alt={caseWithContainer}
            loading={"lazy"}
          />
          <ActionDot
            y={props.dotY}
            x={props.dotX}
            dropdown={[
              {
                id: 'move-back',
                title: 'Извлечь источник',
                handler: removeContainer
              },
              {
                id: 'close-case-with-container',
                title: 'Закрыть крышку',
                handler: closeCaseWithContainer
              },
            ]}
          />
        </>
        ) : isCaseOpen ? (
        <>
          <img
            className="Case"
            src={caseOpened}
            alt={caseOpened}
            loading={"lazy"}
          />
          <ActionDot
            y={props.dotY}
            x={props.dotX}
            dropdown={[
              {
                id: 'close-case',
                title: 'Закрыть',
                handler: closeCase
              },
              {
                id: 'set-container',
                title: 'Установить источник',
                handler: addContainer
              },
            ]}
          />
        </>
      ) : (
        <>
          <img
            className="Case"
            src={caseClosed}
            alt={caseClosed}
            loading={"lazy"}
          />
          <ActionDot
            y={props.dotY}
            x={props.dotX}
            dropdown={[
              {
                id: 'open-case',
                title: 'Открыть',
                handler: openCase
              },
            ]}
          />
        </>
        )}
    </>
  )
}