import './Table.css';
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useState} from "react";

import table from '../../../images/table_with_containers.jpg';
import tableWithoutQuvet from '../../../images/table_without_c.jpg';
import tableWithoutOther from '../../../images/table_without_o.jpg';
import tableWithoutMarinelli from '../../../images/table_without_marinelli.jpg';

import DisplayImage from "../../quiz/DisplayImage";

import {ContainerContext} from "../../../contexts/containerContext";

import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring.ts";
import Popup from "../../popups/Popup";

export default function Table (props) {
  const {
    containerContent, setContainerContent,
    containerPicked, setContainerPicked,
    isContainerIn
  } = useContext(ContainerContext);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});

  const content = {
    'calibration': {
      name: 'Сообщение',
      title: 'Выбрано: источник',
      description: 'Вы установили источник'
    },
    'potato': {
      name: 'Картошка',
      title: 'Выбран образец: картошка',
      description: 'Вы поместили картошку в сосуд Кювета!'
    },
    'meat': {
      name: 'Мясо',
      title: 'Выбран образец: мясо',
      description: 'Вы поместили мясо в сосуд Кювета!'
    },
    'milk': {
      name: 'Молоко',
      title: 'Выбран образец: молоко',
      description: 'Вы поместили молоко в сосуд Кювета!'
    }
  }

  //TODO: переделать
  function checkContainerPicked(evt) {
    switch (true) {
      case evt.target.id === 'quvet' &&
        !!containerContent.calibration &&
        !GammaExploring.check_action_added(PotatoExploringActions.PICK_C_CONTAINER):
        GammaExploring.add_action(PotatoExploringActions.PICK_C_CONTAINER);
        break;
      case evt.target.id === 'quvet' &&
        !containerContent.calibration &&
        Object.keys(containerContent).length !== 0 &&
        !GammaExploring.check_action_added(PotatoExploringActions.PICK_O_CONTAINER):
        GammaExploring.add_action(PotatoExploringActions.PICK_O_CONTAINER);
        break;
      default:
        break;
    }
  }

  function handleContainerPick (evt) {
    setContainerPicked({
      ...containerPicked,
      [`${evt.target.id}`]: true
    });

    checkContainerPicked(evt);
  }

  function handleBack (evt) {
    setContainerPicked({
      ...containerPicked,
      [`${evt.target.id}`]: false
    })
  }

  function handlePut(product) {
    setPopupOpen(true);
    setPopupData(content[product]);
    setContainerContent({[`${product}`]: product});
  }

  function handlePutWithPenalty(product, penalty) {
    GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_POTATO_INTO_CONTAINER, penalty);
    handlePut(product);
  }

  function handleCalibrationPut () {
    handlePut('calibration');
  }

  function handlePotatoPut () {
    handlePutWithPenalty('potato', 0);
  }

  function handleMeatPut () {
    handlePutWithPenalty('meat', 0.001);
  }

  function handleMilkPut () {
    handlePutWithPenalty('milk', 0.001);
  }

  function closePopups () {
    setPopupOpen(false);
  }

  function switchContent() {
    switch (true) {
      case containerPicked.other:
        return (
          <>
            <DisplayImage
              pic={tableWithoutOther}
              withDot={!isContainerIn}
              dotY={props.otherDotY}
              dotX={props.otherDotX}
              dotDropdown={[
                {
                  id: 'other',
                  title: 'Вернуть',
                  handler: handleBack
                }
              ]}
            />
          </>
        )
      case containerPicked.quvet:
        return (
          <>
            <DisplayImage
              pic={tableWithoutQuvet}
              withDot={!isContainerIn}
              dotY={props.quvetDotY}
              dotX={props.quvetDotX}
              dotDropdown={[
                {
                  id: 'quvet',
                  title: 'Вернуть',
                  handler: handleBack
                }
              ]}
            />
          </>
        )
      case containerPicked.marinelli:
        return (
          <>
            <DisplayImage
              pic={tableWithoutMarinelli}
              withDot={!isContainerIn}
              dotY={props.marinelliDotY}
              dotX={props.marinelliDotX}
              dotDropdown={[
                {
                  id: 'marinelli',
                  title: 'Вернуть',
                  handler: handleBack
                }
              ]}
            />
          </>
        )
      default:
        return (
          <>
            <ActionDot
              y={props.marinelliDotY}
              x={props.marinelliDotX}
              dropdown={[
                {
                  id: 'marinelli',
                  title: 'Взять',
                  handler: handleContainerPick
                },
              ]}
            />
            <ActionDot
              y={props.otherDotY}
              x={props.otherDotX}
              dropdown={[
                {
                  id: 'other',
                  title: 'Взять',
                  handler: handleContainerPick
                },
              ]}
            />
            <ActionDot
              y={props.quvetDotY}
              x={props.quvetDotX}
              dropdown={
              Object.keys(containerContent).length !== 0 ? [
                {
                  id: 'quvet',
                  title: 'Взять',
                  handler: handleContainerPick
                }
              ] : [
                {
                  id: 'quvet',
                  title: 'Взять',
                  handler: handleContainerPick
                },
                {
                  id: 'calibration',
                  title: 'Поместить источник',
                  handler: handleCalibrationPut
                },
                {
                  id: 'potato',
                  title: 'Положить картошку',
                  handler: handlePotatoPut
                },
                {
                  id: 'meat',
                  title: 'Положить мясо',
                  handler: handleMeatPut
                },
                {
                  id: 'milk',
                  title: 'Налить молоко',
                  handler: handleMilkPut
                },
              ]}
            />
            <DisplayImage
              pic={table}
              withDot={false}
            />
          </>
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
      { switchContent() }
    </>
  )

}