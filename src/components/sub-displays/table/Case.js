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

  console.log(isContainerIn);
  console.log(isContainerChosen);

  useEffect(() => {
    if (!isCaseOpened) {
      return
    }

    if (isContainerIn) {
      setCaseWithContainer(true);
    } else {
      setCaseEmpty(true);
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

      if (
          isCalibrationContainerChosen &&
          !GammaExploring.check_action_added(PotatoExploringActions.CLOSE_CASE_WITH_C_CONTAINER)
      ) {
        GammaExploring.add_action(PotatoExploringActions.CLOSE_CASE_WITH_C_CONTAINER);
      }

      if (
        isOrganicContainerChosen &&
        !GammaExploring.check_action_added(PotatoExploringActions.CLOSE_CASE_WITH_O_CONTAINER)
      ) {
        GammaExploring.add_action(PotatoExploringActions.CLOSE_CASE_WITH_O_CONTAINER);
      }

      return
    }

    if (
      !GammaExploring.check_action_added(PotatoExploringActions.CLOSE_CASE_WITHOUT_CONTAINERS) &&
      GammaExploring.check_action_added(PotatoExploringActions.REMOVE_C_CONTAINER)
    ) {
      GammaExploring.add_action(PotatoExploringActions.CLOSE_CASE_WITHOUT_CONTAINERS);
    }
  }

  function closeCase () {
    checkCaseContent();
    setCaseOpened(false);
  }

  function checkContainerType () {
    if (isCalibrationContainerChosen) {
      GammaExploring.add_action(PotatoExploringActions.PUT_C_CONTAINER_INTO_CASE);
    }

    if (isOrganicContainerChosen) {
      switch (true) {
        case containerContent['potato'] !== undefined:
          GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE, 0);
          break;
        case containerContent['meat'] !== undefined:
          GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE, 0.05);
          break;
        case containerContent['milk'] !== undefined:
          GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE, 0.05);
          break;
        default:
          GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE, 0.1);
          break;
      }
    }
  }

  function addContainer () {
    checkContainerType();
    setCaseWithContainer(true);
    setContainerIn(true);
  }

  function resetContainerPick () {
    setContainerChosen(false);
    setCalibrationContainerChosen(false);
    setOrganicContainerChosen(false);
    setContainerContent({});

    setCaseWithContainer(false);
    setContainerIn(false);
    setCaseEmpty(true);
  }

  function changeContainer () {
    function getSettedContainer(possibleContainers) {
      for (let item of possibleContainers) {
        if (GammaExploring.check_action_added(item)) {
          return [item]
        }
      }
    }

    function  cancelGroup(canceled){
      for (let item of canceled){
        GammaExploring.cancel_action(item);
      }
    }

    const possibleContainers = [
      PotatoExploringActions.PUT_C_CONTAINER_INTO_CASE,
      PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE,
    ]

    const canceledActionsForContainer = {
      [PotatoExploringActions.PUT_C_CONTAINER_INTO_CASE]: [
        PotatoExploringActions.PUT_C_CONTAINER_INTO_CASE,
        PotatoExploringActions.PICK_C_CONTAINER,
        PotatoExploringActions.CLOSE_CASE_WITH_C_CONTAINER,
      ],
      [PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE]: [
        PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE,
        PotatoExploringActions.PICK_O_CONTAINER,
        PotatoExploringActions.PUT_POTATO_INTO_CONTAINER,
        PotatoExploringActions.CLOSE_CASE_WITH_O_CONTAINER,
      ]
    }

    const currentContainer = getSettedContainer(possibleContainers);

    currentContainer && cancelGroup(canceledActionsForContainer[currentContainer]);

    resetContainerPick();
  }

  function pickUpContainer () {
    if (!GammaExploring.check_action_added(PotatoExploringActions.REMOVE_C_CONTAINER)) {
      GammaExploring.add_action(PotatoExploringActions.REMOVE_C_CONTAINER);
    }

    resetContainerPick();
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
                  id: 'close-case-with-container',
                  title: 'Закрыть крышку',
                  handler: closeCase
                },
                {
                  id: 'pick-up-container',
                  title: 'Достать контейнер',
                  handler: pickUpContainer
                },
                {
                  id: 'change-container',
                  title: 'Сменить контейнер',
                  handler: changeContainer
                }
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