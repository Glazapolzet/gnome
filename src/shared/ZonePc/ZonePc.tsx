import Image from "../../components/image/Image";
import radiometer from "../../images/radiometer.jpg";
import ImageWithDropdownDot from "../../components/image/ImageWithDropdownDot";
import pc from "../../images/pc.jpg";
import ImageWithDot from "../../components/image/ImageWithDot";
import spectrometer from "../../images/spectrometer.jpg";
import DisplayWithSlider from "../../components/display/DisplayWithSlider";
import ButtonBack from "../../components/ButtonBack";
import {PATH_START, PATH_ZONE_SPECTROMETER} from "../../constants/pathnames";
import {FC} from "react";

//TODO: may be a temp prop
interface ZonePcProps {
  handleProgramClick: () => void
}

const ZonePc: FC<ZonePcProps> = ({handleProgramClick}) => {

  return (
    <>
      <ButtonBack
        destination={PATH_START}
      />
      <DisplayWithSlider
        startComponentName={"pc"}
        componentData={{
          "radiometer": <Image
            src={radiometer}
          />,
          "pc": <ImageWithDropdownDot
            src={pc}
            dotX={255}
            dotY={45}
            dotDropdown={[{
              title: 'Запуск ПО «Прогресс»',
              handler: handleProgramClick,
            }]}
          />,
          "spectrometer": <ImageWithDot
            srcImage={spectrometer}
            dotX={135}
            dotY={160}
            dotDestination={PATH_ZONE_SPECTROMETER}
          />,
        }}
      />
    </>
  )

}

export default ZonePc;
