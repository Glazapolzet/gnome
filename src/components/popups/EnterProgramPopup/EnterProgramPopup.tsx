import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring";
import { TempProvider, useTemp } from "../../../contexts/tempContext";

import {Layout, TitleBar, Title, Description, CloseButton, ButtonWrapper, Button} from '../styled';
import {FC, useState} from "react";

interface PopupProps {
  setShown: (val: boolean) => void;
}

interface BtnClickProps {
  penalty: number
}


const Popup: FC<PopupProps> = () => {
  const [wasShown, setShown] = useTemp()
  const [isOpen, setOpen] = useState(true);

  function toggleOpen() {
    setOpen(!isOpen)
    setShown(true)
  }

  function handleClick({penalty}: BtnClickProps): void {
    toggleOpen()
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, penalty);
  }

  return (
    <Layout isOpen={isOpen && !wasShown}>
      <TitleBar>
        <CloseButton onClick={() => handleClick({penalty: 0.9})}/>
      </TitleBar>
      <Title>Предупреждение</Title>
      <Description>
        Для того чтобы продолжить, вам необходимо подождать, пока прогреются приборы установки.
        Выберите, сколько минут вы будете ждать:
      </Description>

      <ButtonWrapper>
        <Button onClick={() => handleClick({penalty: 0.2})}>
          20-30 минут
        </Button>
        <Button onClick={() => handleClick({penalty: 0})}>
          10-15 минут
        </Button>
        <Button onClick={() => handleClick({penalty: 0.6})}>
          5 минут
        </Button>
      </ButtonWrapper>
    </Layout>
  )

}

export default Popup;
