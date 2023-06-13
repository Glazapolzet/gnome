import {Image} from '../styled';
import {FC} from "react";
import ActionDot from "../../action-dot/ActionDot/ActionDot";

interface DisplayImageWithDotProps {
  srcImage: string,
  dotX: number,
  dotY: number,
  dotCallback?: () => void,
  dotDestination: string,
}

const DisplayImageWithDot: FC<DisplayImageWithDotProps> = ({srcImage, dotX, dotY,dotCallback, dotDestination}) => {
  return (
    <>
      <Image
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

export default DisplayImageWithDot;