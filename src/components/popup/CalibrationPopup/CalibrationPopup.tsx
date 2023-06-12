import {Layout, TitleBar, Title, Description, CloseButton, ButtonContainer, Button, Name} from '../styled';

import {FC, useContext, useState} from "react";
import {FormContext} from "../../../contexts/formContext";
import {WindowContext} from "../../../contexts/windowContext";
import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring";

interface CalibrationPopupProps {
  showPopup: boolean,
}

const CalibrationPopup: FC<CalibrationPopupProps> = ({showPopup}) => {

  const {
    isCalibrationPending,
    isBackgroundPending,
    isActivityPending,
    setCalibrationPending
  } = useContext(FormContext);

  const {setCalibrationReportDone} = useContext(WindowContext);

  const [isOpen, setOpen] = useState(showPopup);

  function handleClose() : void {
    setOpen(false);
  }

  function handleClick() : void {

  }

  function handleBtnClick() {
    props.onClick();
    setCalibrationReportDone(false);
    setCalibrationPending(true);
    GammaExploring.add_action(PotatoExploringActions.ACTIVATE_CALIBRATION_POPUP);
  }

  return (
    <Layout isOpen={isOpen}>
      <TitleBar>
        <Name>
          Энергетическая калибровка
        </Name>
        <CloseButton onClick={handleClose}/>
      </TitleBar>

      <Title>
        Энергетическая калибровка сцинтилляционного гамма-спектрометра.
      </Title>
      <Description>
        Установите контрольный источник &lt;137Cs+40K&gt; на детектор
        и нажмите &lt;Продолжить&gt; для пуска измерений.
      </Description>

      <ButtonContainer>
        <Button onClick={handleMoreTimeClick}>
          Продолжить
        </Button>
      </ButtonContainer>
    </Layout>
    // <Popup
    //   name={"Энергетическая калибровка"}
    //   isOpen={props.isOpen}
    //   onClose={props.onClose}
    //   title={"Энергетическая калибровка сцинтилляционного гамма-спектрометра."}
    //   description={`Установите контрольный источник <137Cs+40K> на детектор и нажмите <Продолжить> для пуска измерений.`}
    // >
    //   <div className="CalibrationPopup__buttons-wrapper">
    //     <button
    //       type="button"
    //       className={`CalibrationPopup__button ${
    //         isCalibrationPending || isBackgroundPending || isActivityPending
    //           ? "CalibrationPopup__button_disabled"
    //           : ""}`}
    //       onClick={handleBtnClick}
    //       disabled={isCalibrationPending || isBackgroundPending || isActivityPending}
    //     >
    //       Продолжить
    //     </button>
    //   </div>
    // </Popup>
  )
}

export default CalibrationPopup;
