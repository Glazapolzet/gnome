import './Case.css'
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useEffect, useState} from "react";
import caseClosed from "../../../images/case_closed.jpg";
import caseOpened from "../../../images/case_opened.jpg";
import caseWithContainer from "../../../images/case_with-container.jpg";
import {ContainerContext} from "../../../contexts/containerContext";
import {CaseContext} from "../../../contexts/caseContext";

export default function Case (props) {

  const {isContainerChosen, setContainerChosen, isContainerIn, setContainerIn} = useContext(ContainerContext);
  const {isCaseOpened, setCaseOpened} = useContext(CaseContext);

  const [isCaseEmpty, setCaseEmpty] = useState(false);
  const [isCaseWithContainer, setCaseWithContainer] = useState(false);

  useEffect(() => {
    if (isCaseOpened) {
      if (isContainerIn) {
        setCaseWithContainer(true);
      } else {
        setCaseEmpty(true);
      }
    }
  }, [])

  function openCase () {
    setCaseOpened(true);
    if (isContainerIn) {
      setCaseWithContainer(true);
    }
    else {
      setCaseEmpty(true);
    }
  }

  function closeCase () {
    setCaseOpened(false);
  }

  function addContainer () {
    setCaseWithContainer(true);
    setContainerIn(true);
  }

  function removeContainer () {
    setContainerChosen(false);

    setCaseWithContainer(false);
    setContainerIn(false);
    setCaseEmpty(true);
  }

  function switchContent () {
    if (isCaseOpened) {
      if (isCaseWithContainer) {
        return (
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
                  handler: closeCase
                },
              ]}
            />
          </>
        )
      }
      if (isCaseEmpty) {
        return (
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
              dropdown={isContainerChosen ? [
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
              ] : [
                {
                  id: 'close-case',
                  title: 'Закрыть',
                  handler: closeCase
                }
              ]}
            />
          </>
        )
      }
    }
    else {
      return (
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
      )
    }
  }

  return switchContent()
}