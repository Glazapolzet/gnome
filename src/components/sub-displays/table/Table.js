import './Table.css';
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useEffect, useState} from "react";

import table from '../../../images/table_with_containers.jpg';
import tableWithoutCalibration from '../../../images/table_without_c.jpg';
import tableWithoutOrganic from '../../../images/table_without_o.jpg';
import tableWithoutMarinelli from '../../../images/table_without_marinelli.jpg';

import DisplayImage from "../../quiz/DisplayImage";

import {ContainerContext} from "../../../contexts/containerContext";

import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring.ts";
import Popup from "../../popups/Popup";

export default function Table (props) {

  const { containerPicked, setContainerPicked } = useContext(ContainerContext);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});

  const {setContainerContent} = useContext(ContainerContext);

  const content = {
    'potato': {
      name: 'Картошка',
      title: 'Выбран образец: картошка',
      description: 'Вы поместили картошку в сосуд Маринелли!'
    },
    'meat': {
      name: 'Мясо',
      title: 'Выбран образец: мясо',
      description: 'Вы поместили мясо в сосуд Маринелли!'
    },
    'milk': {
      name: 'Молоко',
      title: 'Выбран образец: молоко',
      description: 'Вы поместили молоко в сосуд Маринелли!'
    }
  }

  function checkContainerPicked() {
    switch (true) {
      case containerPicked.organic:
        GammaExploring.add_action(PotatoExploringActions.PICK_O_CONTAINER);
        break;
      case containerPicked.calibration:
        GammaExploring.add_action(PotatoExploringActions.PICK_C_CONTAINER);
        break;
      case containerPicked.marinelli:
        GammaExploring.add_action_with_penalty(PotatoExploringActions.PICK_O_CONTAINER, 0.01);
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

    checkContainerPicked();
  }

  function handleBack (evt) {
    setContainerPicked({
      ...containerPicked,
      [`${evt.target.id}`]: false
    })
  }

  function handlePutWithPenalty(product, penalty) {
    GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_POTATO_INTO_CONTAINER, penalty);
    setPopupOpen(true);
    setPopupData(content[product]);
    setContainerContent({[`${product}`]: product});
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
      case containerPicked.organic:
        return (
          <>
            <DisplayImage
              pic={tableWithoutOrganic}
              withDot={true}
              dotY={props.organicDotY}
              dotX={props.organicDotX}
              dotDropdown={[
                {
                  id: 'organic',
                  title: 'Вернуть',
                  handler: handleBack
                }
              ]}
            />
          </>
        )
      case containerPicked.calibration:
        return (
          <>
            <DisplayImage
              pic={tableWithoutCalibration}
              withDot={true}
              dotY={props.calibrationDotY}
              dotX={props.calibrationDotX}
              dotDropdown={[
                {
                  id: 'calibration',
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
              withDot={true}
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
              y={props.organicDotY}
              x={props.organicDotX}
              dropdown={
              GammaExploring.check_action_added(PotatoExploringActions.PUT_POTATO_INTO_CONTAINER) ? [
                {
                  id: 'organic',
                  title: 'Взять',
                  handler: handleContainerPick
                }
              ] : [
                {
                  id: 'organic',
                  title: 'Взять',
                  handler: handleContainerPick
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
            <ActionDot
              y={props.calibrationDotY}
              x={props.calibrationDotX}
              dropdown={[
                {
                  id: 'calibration',
                  title: 'Взять',
                  handler: handleContainerPick
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