import {Image} from '../styled';
import {FC} from "react";

interface DisplayImageProps {
  src: string,
}

const DisplayImage: FC<DisplayImageProps> = ({src}) => {
  return (
    <Image
      src={src}
      alt={"image"}
    />
  )
}

export default DisplayImage;