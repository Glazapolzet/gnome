import ButtonBack from "../../components/ButtonBack";
import Case from "../../components/sub-displays/table/Case";
import Table from "../../components/sub-displays/table/Table";
import DisplayWithSlider from "../../components/display/DisplayWithSlider";
import {PATH_ZONE_PC} from "../../constants/pathnames";


const ZoneSpectrometer = () => {
  return (
    <>
      <ButtonBack
        destination={PATH_ZONE_PC}
      />
      <DisplayWithSlider
        startComponentName={"case"}
        componentData={{
          "case": <Case dotX={820} dotY={320} />,
          "table": <Table dotX={900} dotY={300} />,
        }}
      />
    </>
  )
}

export default ZoneSpectrometer;