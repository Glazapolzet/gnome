import './FirstTimePopup.css'
import Popup from "./Popup";
import GammaExploring, { PotatoExploringActions } from "../../actions/gammaExploring.ts";

export default function FirstTimePopup (props) {

  function handleFirstBtnClick () {
    props.onClose();
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, 0.2);
  }

  function handleSecondBtnClick () {
    props.onClose();
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, 0);
  }

  function handleThirdBtnClick () {
    props.onClose();
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, 0.6);
  }

  function handleClose () {
    props.onClose();
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, 0.9);
  }

  return (
    <Popup
      name={""}
      isOpen={props.isOpen}
      onClose={handleClose}
      title={"Предупреждение"}
      description={"Для того чтобы продолжить, вам необходимо подождать, пока прогреются приборы установки. Выберите, сколько минут вы будете ждать:"}
    >
      <div className="FirstTimePopup__buttons-wrapper">
        <button
          type="button"
          className="FirstTimePopup__button"
          onClick={handleFirstBtnClick}
        >
          20-30 минут
        </button>
        <button
          type="button"
          className="FirstTimePopup__button"
          onClick={handleSecondBtnClick}
        >
          10-15 минут
        </button>
        <button
          type="button"
          className="FirstTimePopup__button"
          onClick={handleThirdBtnClick}
        >
          5 минут
        </button>
      </div>
    </Popup>
  )
}