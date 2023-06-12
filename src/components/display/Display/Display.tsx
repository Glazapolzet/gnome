import {FC} from "react";
import {Container} from "../styled";
import DisplayImageWithDot from "../../display-image/DisplayImageWithDot";


interface DisplayProps {
  srcImage: string,
  dotX: number,
  dotY: number,
  dotDestination: string,
}

const Display: FC<DisplayProps> = ({srcImage, dotX, dotY, dotDestination}) => {
  return (
    <Container>
      <DisplayImageWithDot
        src={srcImage}
        dotX={dotX}
        dotY={dotY}
        dotDestination={dotDestination}
      />
    </Container>
  )

}

export default Display;
