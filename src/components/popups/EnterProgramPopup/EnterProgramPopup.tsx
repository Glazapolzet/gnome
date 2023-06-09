import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring";

import {Layout, TitleBar, Title, Description, CloseButton, ButtonWrapper, Button} from '../styled';
import {FC, useState} from "react";

interface PopupProps {
  showPopup: boolean,
}

const Popup: FC<PopupProps> = ({showPopup}) => {

  const [isOpen, setOpen] = useState(showPopup);

  console.log(isOpen);

  function handleMoreTimeClick() : void {
    setOpen(false);
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, 0.2);
  }

  function handleCorrectTimeClick() : void {
    setOpen(false);
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, 0);
  }

  function handleLessTimeClick() : void {
    setOpen(false);
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, 0.6);
  }

  function handleClose() : void {
    setOpen(false);
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, 0.9);
  }

  return (
    <Layout isOpen={isOpen}>
      <TitleBar>
        <CloseButton onClick={handleClose}/>
      </TitleBar>
      <Title>Предупреждение</Title>
      <Description>
        Для того чтобы продолжить, вам необходимо подождать, пока прогреются приборы установки.
        Выберите, сколько минут вы будете ждать:
      </Description>

      <ButtonWrapper>
        <Button onClick={handleMoreTimeClick}>
          20-30 минут
        </Button>
        <Button onClick={handleCorrectTimeClick}>
          10-15 минут
        </Button>
        <Button onClick={handleLessTimeClick}>
          5 минут
        </Button>
      </ButtonWrapper>
    </Layout>
  )

}

export default Popup;
