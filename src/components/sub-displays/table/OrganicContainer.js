import './OrganicContainer.css';
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useState} from "react";
import organicContainerOpened from '../../../images/organic-container_opened.jpg';
import organicContainerClosed from '../../../images/organic-container_closed.jpg';
import organicContainerWithPotato from '../../../images/organic-container_with_potato.jpg';
import Popup from "../../popups/Popup";
import {ContainerContext} from "../../../contexts/containerContext";
import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring.ts";

export default function OrganicContainer (props) {

  const [isContainerOpen, setContainerOpen] = useState(false);

  const [isContainerWithPotato, setContainerWithPotato] = useState(false);

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

  function handleOpen () {
    setContainerOpen(true);
  }

  function handleClose () {
    setContainerOpen(false);
  }

  function handlePutWithPenalty(product, penalty) {
    GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_POTATO_INTO_CONTAINER, penalty);
    setPopupOpen(true);
    setPopupData(content[product]);
    setContainerContent({[`${product}`]: product});
  }

  function handlePotatoPut () {
    setContainerWithPotato(true);
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
    setContainerOpen(false);
    setContainerWithPotato(false);
  }

  function switchContent() {
    switch (true) {
      case isContainerWithPotato:
        return (
          <img
            className="OrganicContainer"
            src={organicContainerWithPotato}
            alt={organicContainerWithPotato}
          />
        )
      case isContainerOpen:
        return (
          <>
            <img
              className="OrganicContainer"
              src={organicContainerOpened}
              alt={organicContainerOpened}
            />
            <ActionDot
              y={props.dotY}
              x={props.dotX}
              dropdown={[
                {
                  id: 'close-container',
                  title: 'Закрыть',
                  handler: handleClose
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
          </>
        )
      default:
        return (
          <>
            <img
              className="OrganicContainer"
              src={organicContainerClosed}
              alt={organicContainerClosed}
            />
            <ActionDot
              y={props.dotY}
              x={props.dotX}
              dropdown={[
                {
                  id: 'move-back',
                  title: 'Назад',
                  handler: props.onBack
                },
                {
                  id: 'open-container',
                  title: 'Открыть',
                  handler: handleOpen
                },
                {
                  id: 'pick',
                  title: 'Забрать',
                  handler: props.onPick
                },
              ]}
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
      {switchContent()}
    </>
  )
}