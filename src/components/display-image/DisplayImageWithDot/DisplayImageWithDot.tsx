import {Image} from '../styled';
import {FC} from "react";
import ActionDot from "../../action-dot/ActionDot";

interface DisplayImageWithDotProps {
  src: string,
  dotX: number,
  dotY: number,
  dotDestination: string,
}

const DisplayImageWithDot: FC<DisplayImageWithDotProps> = ({src, dotX, dotY, dotDestination}) => {
  return (
    <>
      <Image
        src={src}
        alt={"image"}
      />
      <ActionDot
        xCoord={dotX}
        yCoord={dotY}
        destination={dotDestination}
      />
    </>
  )
}

export default DisplayImageWithDot;