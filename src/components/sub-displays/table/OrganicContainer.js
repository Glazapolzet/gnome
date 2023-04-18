import './OrganicContainer.css';
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useState} from "react";
import organicContainerOpened from '../../../images/organic-container_opened.jpg'
import organicContainerClosed from '../../../images/organic-container_closed.jpg'
import Popup from "../../popups/Popup";
import {ContainerContext} from "../../../contexts/containerContext";
import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring.ts";

export default function OrganicContainer (props) {

  const [isContainerOpen, setContainerOpen] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});

  const {setContainerContent} = useContext(ContainerContext);

  function handleOpen () {
    setContainerOpen(true);
  }

  function handleClose () {
    setContainerOpen(false);
  }

  function handlePotatoPut () {
    GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_POTATO_INTO_CONTAINER, 0);
    setPopupOpen(true);
    setPopupData({
      name: 'Картошка',
      title: 'Выбран образец: картошка',
      description: 'Вы поместили картошку в сосуд Маринелли!'
    });
    setContainerContent({potato: 'potato'});
  }

  function handleMeatPut () {
    GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_POTATO_INTO_CONTAINER, 0.001);
    setPopupOpen(true);
    setPopupData({
      name: 'Мясо',
      title: 'Выбран образец: мясо',
      description: 'Вы поместили мясо в сосуд Маринелли!'
    });
    setContainerContent({meat: 'meat'});
  }

  function handleMilkPut () {
    GammaExploring.add_action_with_penalty(PotatoExploringActions.PUT_POTATO_INTO_CONTAINER, 0.001);
    setPopupOpen(true);
    setPopupData({
      name: 'Молоко',
      title: 'Выбран образец: молоко',
      description: 'Вы поместили молоко в сосуд Маринелли!'
    });
    setContainerContent({milk: 'milk'});
  }

  function closePopups () {
    setPopupOpen(false);
    setContainerOpen(false);
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
      {isContainerOpen ? (
        <>
          <img
            className="OrganicContainer"
            src={organicContainerOpened}
            alt={organicContainerOpened}
            loading={"lazy"}
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
                handler: (handleMeatPut)
              },
              {
                id: 'milk',
                title: 'Налить молоко',
                handler: (handleMilkPut)
              },
            ]}
          />
        </>
      ) : (
        <>
          <img
            className="OrganicContainer"
            src={organicContainerClosed}
            alt={organicContainerClosed}
            loading={"lazy"}
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
      )}
    </>
  )
}