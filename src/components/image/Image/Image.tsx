import {Img} from '../styled';
import {FC} from "react";

interface DisplayImageProps {
  src: string,
}

const Image: FC<DisplayImageProps> = ({src}) => {
  return (
    <Img
      src={src}
      alt={"image"}
    />
  )
}

export default Image;