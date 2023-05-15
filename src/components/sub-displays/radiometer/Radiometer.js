import DisplayImage from "../../quiz/DisplayImage";
import {useContext, useEffect, useState} from "react";
import {CaseContext} from "../../../contexts/caseContext";
import {ContainerContext} from "../../../contexts/containerContext";

import radOpened from "../../../images/rad_opened.jpg";
import radCloseUp from "../../../images/rad_closeup.jpg";
import radWithCalibration from "../../../images/rad_with_calibration.jpg";
import radWithOrganic from "../../../images/rad_with_organic.jpg";

import GammaExploring, {PotatoExploringActions} from "../../../actions/gammaExploring";
import Popup from "../../popups/Popup";

export default function Radiometer (props) {

  const {
    isContainerIn, setContainerIn,
    containerContent, setContainerContent,
    containerPicked, setContainerPicked
  } = useContext(ContainerContext);

  const [isContainerPicked, setContainerToPicked] = useState(Object.values(containerPicked).some(value => value));

  const {isCaseOpened, setCaseOpened} = useContext(CaseContext);

  const [isCaseEmpty, setCaseEmpty] = useState(false);
  const [isCaseWithContainer, setCaseWithContainer] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupData = {
    name: 'Предупреждение',
    title: 'Внимание',
    description: 'Данный тип сосуда нельзя помещать в радиометр'
  };

  function closePopups () {
    setPopupOpen(false);
  }

  useEffect(() => {
    if (isCaseOpened) {
      openCase();
    }
  }, [])

  function openCase() {
    setCaseOpened(true);
    if (isContainerIn) {
      setCaseWithContainer(true);
    } else {
      setCaseEmpty(true);
    }
  }

  function checkCaseContent () {
    if (isContainerIn) {

      if (
        containerPicked.calibration &&
        !GammaExploring.check_action_added(PotatoExploringActions.CLOSE_CASE_WITH_C_CONTAINER)
      ) {
        GammaExploring.add_action(PotatoExploringActions.CLOSE_CASE_WITH_C_CONTAINER);
      }

      if (
        containerPicked.organic &&
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

  function closeCase() {
    checkCaseContent();
    setCaseOpened(false);
  }

  function checkContainerType () {

    if (containerPicked.calibration) {
      GammaExploring.add_action(PotatoExploringActions.PUT_C_CONTAINER_INTO_CASE);
    }

    if (containerPicked.organic) {
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

    if (containerPicked.marinelli) {
      GammaExploring.cancel_action(PotatoExploringActions.PICK_O_CONTAINER);
      setPopupOpen(true);
    }
  }

  function addContainer () {
    checkContainerType();
    if (containerPicked.marinelli) {
      return;
    }

    setCaseWithContainer(true);
    setContainerIn(true);
  }

  function resetContainerPick () {
    setContainerToPicked(false);
    setContainerPicked({
      'marinelli': false,
      'organic': false,
      'calibration': false
    });
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

  function switchContent() {
    switch (true) {
      case isCaseOpened && isCaseWithContainer && containerPicked.calibration:
        return (
          <DisplayImage
            pic={radWithCalibration}
            withDot={true}
            dotX={props.dotX}
            dotY={props.dotY}
            dotDropdown={[
              {
                id: 'close-case-with-container',
                title: 'Закрыть',
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
              }]}
          />
        )
      case isCaseOpened && isCaseWithContainer && containerPicked.organic:
        return (
          <DisplayImage
            pic={radWithOrganic}
            withDot={true}
            dotX={props.dotX}
            dotY={props.dotY}
            dotDropdown={[
              {
                id: 'close-case-with-container',
                title: 'Закрыть',
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
              }]}
          />
        )
      case isCaseOpened && isCaseEmpty:
        return (
          <DisplayImage
            pic={radOpened}
            withDot={true}
            dotX={props.dotX}
            dotY={props.dotY}
            dotDropdown={isContainerPicked ? [
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
        )
      default:
        return (
          <DisplayImage
            pic={radCloseUp}
            withDot={true}
            dotX={props.dotX}
            dotY={props.dotY}
            dotDropdown={[
              {
                id: "open-rad",
                title: 'Открыть',
                handler: openCase
              },
            ]}
          />
        )
    }
  }

  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopups}
        name={popupData.name}
        title={popupData.title}
        description={popupData.description}
      />
      {switchContent()}
    </>
  )

}