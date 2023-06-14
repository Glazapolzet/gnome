import {Img} from '../styled';
import {FC} from "react";
import ActionDot from "../../action-dot/ActionDot/ActionDot";

interface DisplayImageWithDotProps {
  srcImage: string,
  dotX: number,
  dotY: number,
  dotCallback?: () => void,
  dotDestination: string,
}

const ImageWithDot: FC<DisplayImageWithDotProps> = ({srcImage, dotX, dotY,dotCallback, dotDestination}) => {
  return (
    <>
      <Img
        src={srcImage}
        alt={"image"}
      />
      <ActionDot
        xCoord={dotX}
        yCoord={dotY}
        callback={dotCallback}
        destination={dotDestination}
      />
    </>
  )
}

export default ImageWithDot;