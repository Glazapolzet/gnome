import './Table.css';
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useState} from "react";
import table from '../../../images/table_tmp.jpg';
import calibrationContainer from '../../../images/calibration-container.jpg';
import OrganicContainer from "./OrganicContainer";
import {ContainerContext} from "../../../contexts/containerContext";

import GammaExploring, { PotatoExploringActions } from "../../../actions/gammaExploring.ts";

export default function Table (props) {

  const {
    isCalibrationContainerChosen, setCalibrationContainerChosen,
    isOrganicContainerChosen, setOrganicContainerChosen,
  } = useContext(ContainerContext);

  const [showCalibrationContainer, setShowCalibrationContainer] = useState(false);
  const [showOrganicContainer, setShowOrganicContainer] = useState(false);

  function handleCalibrationContainerChoose () {
    if (!(isCalibrationContainerChosen || isOrganicContainerChosen)) {
      setShowOrganicContainer(false);
      setShowCalibrationContainer(true);
    }
  }

  function handleOrganicContainerChoose () {
    if (!(isCalibrationContainerChosen || isOrganicContainerChosen)) {
      setShowCalibrationContainer(false);
      setShowOrganicContainer(true);
    }
  }

  function moveFromContainerPick () {
    setShowCalibrationContainer(false);
    setShowOrganicContainer(false);
  }

  function handleCalibrationContainerPick () {
    GammaExploring.add_action(PotatoExploringActions.PICK_C_CONTAINER);
    setOrganicContainerChosen(false);
    setCalibrationContainerChosen(true);

    moveFromContainerPick();
  }

  function handleOrganicContainerPick () {
    GammaExploring.add_action(PotatoExploringActions.PICK_O_CONTAINER);
    setCalibrationContainerChosen(false);
    setOrganicContainerChosen(true);

    moveFromContainerPick();
  }

  return (
    <>
      {showCalibrationContainer ? (
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
                handler: moveFromContainerPick
              },
              {
                id: 'pick',
                title: 'Забрать',
                handler: handleCalibrationContainerPick
              }
            ]}
          />
        </>
      ) : showOrganicContainer ? (
        <OrganicContainer
          dotY={props.dotY}
          dotX={props.dotX}
          onBack={moveFromContainerPick}
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