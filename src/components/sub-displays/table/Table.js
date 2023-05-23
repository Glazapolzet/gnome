import './Table.css';
import ActionDot from "../../action-dot/ActionDot";
import {useContext, useState} from "react";
import table from '../../../images/table.jpg';
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
      setShowOrganicContainer(false);
      setShowCalibrationContainer(true);
  }

  function handleOrganicContainerChoose () {
      setShowCalibrationContainer(false);
      setShowOrganicContainer(true);
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

  function switchContent() {
    switch (true) {
      case showCalibrationContainer:
        return (
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
        )
      case showOrganicContainer:
        return (
          <OrganicContainer
            dotY={props.dotY}
            dotX={props.dotX}
            onBack={moveFromContainerPick}
            onPick={handleOrganicContainerPick}
          />
        )
      case isCalibrationContainerChosen || isOrganicContainerChosen:
        return (
          <>
            <img
              className="Table"
              src={table}
              alt={table}
              loading={"lazy"}
            />
          </>
        )
      default:
        return (
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
        )
    }
  }

  return switchContent();

}