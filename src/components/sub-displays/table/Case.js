import './Case.css'
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useEffect, useState} from "react";
import caseClosed from "../../../images/case_closed.jpg";
import caseOpened from "../../../images/case_opened.jpg";
import caseWithContainer from "../../../images/case_with-container.jpg";
import {ContainerContext} from "../../../contexts/containerContext";
import {CaseContext} from "../../../contexts/caseContext";
import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring.ts";

export default function Case (props) {

  const {
    isContainerIn, setContainerIn,
    containerContent, setContainerContent,
    isCalibrationContainerChosen, setCalibrationContainerChosen,
    isOrganicContainerChosen, setOrganicContainerChosen
  } = useContext(ContainerContext);

  const [isContainerChosen, setContainerChosen] = useState(isCalibrationContainerChosen || isOrganicContainerChosen);

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

  function checkCaseContent () {
    if (isContainerIn) {
      if (isCalibrationContainerChosen) {
        GammaExploring.add_action(PotatoExploringActions.CLOSE_CASE_WITH_C_CONTAINER);
      }
      if (isOrganicContainerChosen) {
        GammaExploring.add_action(PotatoExploringActions.CLOSE_CASE_WITH_O_CONTAINER);
      }
    }
  }

  function closeCase () {
    checkCaseContent();
    setCaseOpened(false);
  }

  function checkContainer () {
    if (isCalibrationContainerChosen) {
      GammaExploring.add_action(PotatoExploringActions.PUT_C_CONTAINER_INTO_CASE);
    }
    if (isOrganicContainerChosen) {
      if ('potato' in containerContent) {
        GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE, 0);
      }
      if ('meat' in containerContent) {
        GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE, 0.1);
      }
      if ('milk' in containerContent) {
        GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE, 0.1);
      }
    }
  }

  function addContainer () {
    checkContainer();
    setCaseWithContainer(true);
    setContainerIn(true);
  }

  function removeContainer () {
    setContainerChosen(false);
    setCalibrationContainerChosen(false);
    setOrganicContainerChosen(false);
    setContainerContent({});

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