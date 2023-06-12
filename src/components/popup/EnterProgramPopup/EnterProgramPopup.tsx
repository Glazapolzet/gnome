import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring";
import { useGlobal } from "../../../contexts/GlobalContext";
import {Layout, TitleBar, Title, Description, CloseButton, ButtonContainer, Button} from '../styled';
import {FC, useState} from "react";


const Popup: FC = () => {

  const [wasShown, setShown] = useGlobal();
  const [isOpen, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    setShown(true);
  }

  function handleClick(penalty: number): void {
    handleClose();
    GammaExploring.add_action_with_penalty(PotatoExploringActions.WAIT_FOR_WARMING_UP, penalty);
  }

  return (
    <Layout isOpen={isOpen && !wasShown}>
      <TitleBar>
        <CloseButton onClick={() => handleClick(0.9)}/>
      </TitleBar>
      <Title>
        Предупреждение
      </Title>
      <Description>
        Для того чтобы продолжить, вам необходимо подождать, пока прогреются приборы установки.
        Выберите, сколько минут вы будете ждать:
      </Description>

      <ButtonContainer>
        <Button onClick={() => handleClick(0.2)}>
          20-30 минут
        </Button>
        <Button onClick={() => handleClick( 0)}>
          10-15 минут
        </Button>
        <Button onClick={() => handleClick( 0.6)}>
          5 минут
        </Button>
      </ButtonContainer>
    </Layout>
  )

}

export default Popup;
