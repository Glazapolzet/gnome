import cabinet from "../../images/cabinet.jpg";
import ImageWithDot from "../../components/image/ImageWithDot";
import GammaExploring, {PotatoExploringActions} from "../../actions/gammaExploring";
import {PATH_ZONE_PC} from "../../constants/pathnames";
import Display from "../../components/display/Display";


const Start = () => {

  function handlePcClick () {
    if (!GammaExploring.check_action_added(PotatoExploringActions.ENABLE_PC)) {
      GammaExploring.add_action(PotatoExploringActions.ENABLE_PC);
    }
  }

  return (
    <Display
      component={
        <ImageWithDot
          srcImage={cabinet}
          dotX={725}
          dotY={530}
          dotCallback={handlePcClick}
          dotDestination={PATH_ZONE_PC}
        />
      }
    />
  )
}

export default Start;