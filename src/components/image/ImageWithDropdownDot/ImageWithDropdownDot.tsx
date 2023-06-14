import {Img} from '../styled';
import {FC} from "react";
import ActionDotWithDropdown from "../../action-dot/ActionDotWithDropdown";
import type {DropdownProps} from "../../action-dot/Dropdown";

interface DisplayImageWithDropdownDotProps {
  src: string,
  dotX: number,
  dotY: number,
  dotDropdown: Array<DropdownProps>,
}

const ImageWithDropdownDot: FC<DisplayImageWithDropdownDotProps> = ({src, dotX, dotY, dotDropdown}) => {
  return (
    <>
      <Img
        src={src}
        alt={"image"}
      />
      <ActionDotWithDropdown
        xCoord={dotX}
        yCoord={dotY}
        dropdown={dotDropdown}
      />
    </>
  )
}

export default ImageWithDropdownDot;