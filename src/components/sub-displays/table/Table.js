import './Table.css';
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useState} from "react";
import table from '../../../images/table_tmp.jpg';
import calibrationContainer from '../../../images/calibration-container.jpg';
import OrganicContainer from "./OrganicContainer";
import {ContainerContext} from "../../../contexts/containerContext";

export default function Table (props) {

  const {setContainerChosen} = useContext(ContainerContext);

  const [isCalibrationContainerChosen, setCalibrationContainer] = useState(false);
  const [isOrganicContainerChosen, setOrganicContainer] = useState(false);

  function handleCalibrationContainerChoose () {
    setOrganicContainer(false);
    setCalibrationContainer(true);
  }

  function handleOrganicContainerChoose () {
    setCalibrationContainer(false);
    setOrganicContainer(true);
  }

  function resetContainerPick () {
    setCalibrationContainer(false);
    setOrganicContainer(false);
  }

  function handleCalibrationContainerPick () {
    // ТУТ ЕЩЕ ДОЛЖЕН ОБНОВЛЯТЬСЯ КОНТЕКСТ
    setContainerChosen(true);

    resetContainerPick();
  }

  function handleOrganicContainerPick () {
    // ТУТ ЕЩЕ ДОЛЖЕН ОБНОВЛЯТЬСЯ КОНТЕКСТ
    setContainerChosen(true);

    resetContainerPick();
  }

  return (
    <>
      {isCalibrationContainerChosen ? (
        <>
          <img
            className="Table"
            src={calibrationContainer}
            alt={calibrationContainer}
            loading={"lazy"}
          />
          <ActionDot
            y={props.dotY}
            x={props.dotX}
            dropdown={[
              {
                id: 'move-back',
                title: 'Назад',
                handler: resetContainerPick
              },
              {
                id: 'pick',
                title: 'Забрать',
                handler: handleCalibrationContainerPick
              }
            ]}
          />
        </>
      ) : isOrganicContainerChosen ? (
        <OrganicContainer
          dotY={props.dotY}
          dotX={props.dotX}
          onBack={resetContainerPick}
          onPick={handleOrganicContainerPick}
        />
      ) : (
        <>
          <img
            className="Table"
            src={table}
            alt={table}
            loading={"lazy"}
          />
          <ActionDot
            y={props.dotY}
            x={props.dotX}
            dropdown={[
              {
                id: 'calibration-container',
                title: 'Взять контрольный источник',
                handler: handleCalibrationContainerChoose
              },
              {
                id: 'organic-container',
                title: 'Взять сосуд Маринелли',
                handler: handleOrganicContainerChoose
              }
            ]}
          />
        </>
      )}
    </>
  )
}