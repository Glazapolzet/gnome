import './OrganicContainer.css';
import ActionDot from "../../action-dot/ActionDot";
import {useState} from "react";
import organicContainerOpened from '../../../images/organic-container_opened.jpg'
import organicContainerClosed from '../../../images/organic-container_closed.jpg'
import Popup from "../../popups/Popup";

export default function OrganicContainer (props) {

  const [isContainerOpen, setContainerOpen] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);

  const [popupData, setPopupData] = useState({});

  function handleOpen () {
    setContainerOpen(true);
  }

  function handleClose () {
    setContainerOpen(false);
  }

  function handlePotatoPut () {
    setPopupOpen(true);
    setPopupData({
      name: 'Картошка',
      title: 'Выбран образец: картошка',
      description: 'Вы поместили картошку в сосуд Маринелли!'
    })
  }

  function handleMeatPut () {
    setPopupOpen(true);
    setPopupData({
      name: 'Мясо',
      title: 'Выбран образец: мясо',
      description: 'Вы поместили мясо в сосуд Маринелли!'
    })
  }

  function handleMilkPut () {
    setPopupOpen(true);
    setPopupData({
      name: 'Молоко',
      title: 'Выбран образец: молоко',
      description: 'Вы поместили молоко в сосуд Маринелли!'
    })
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