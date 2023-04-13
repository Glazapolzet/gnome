import './OrganicContainer.css';
import ActionDot from "../../action-dot/ActionDot";
import {useState} from "react";
import organicContainerOpened from '../../../images/organic-container_opened.jpg'
import organicContainerClosed from '../../../images/organic-container_closed.jpg'
import Popup from "../../popups/Popup";

export default function OrganicContainer (props) {

  const [isContainerOpen, setContainerOpen] = useState(false);

  const [isPotatoPopupOpen, setPotatoPopup] = useState(false);

  function handleOpen () {
    setContainerOpen(true);
  }

  function handleClose () {
    setContainerOpen(false);
  }

  function handlePotatoPut () {
    setPotatoPopup(true);
  }

  function closePopups () {
    setPotatoPopup(false);
  }

  return (
    <>
      <Popup
        isOpen={isPotatoPopupOpen}
        onClose={closePopups}
        name={'Картошка'}
        title={'Выбран образец: картошка'}
        description={'Вы положили картошку в сосуд Маринелли!'}
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
                handler: (() => console.log("meat"))
              },
              {
                id: 'milk',
                title: 'Налить молоко',
                handler: (() => console.log("milk"))
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