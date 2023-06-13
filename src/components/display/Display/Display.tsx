import {FC} from "react";
import {Container} from "../styled";
import DisplayImageWithDot from "../../display-image/DisplayImageWithDot";


interface DisplayProps {
  srcImage: string,
  dotX: number,
  dotY: number,
  dotCallback: () => void,
  dotDestination: string,
}

const Display: FC<DisplayProps> = ({srcImage, dotX, dotY, dotCallback, dotDestination}) => {
  return (
    <Container>
      <DisplayImageWithDot
        srcImage={srcImage}
        dotX={dotX}
        dotY={dotY}
        dotCallback={dotCallback}
        dotDestination={dotDestination}
      />
    </Container>
  )

}

export default Display;
