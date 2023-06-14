import {Image} from '../styled';
import {FC} from "react";
import ActionDotWithDropdown from "../../action-dot/ActionDotWithDropdown";
import type {DropdownProps} from "../../action-dot/Dropdown";

interface DisplayImageWithDropdownDotProps {
  src: string,
  dotX: number,
  dotY: number,
  dotDropdown: Array<DropdownProps>,
}

const DisplayImageWithDropdownDot: FC<DisplayImageWithDropdownDotProps> = ({src, dotX, dotY, dotDropdown}) => {
  return (
    <>
      <Image
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

export default DisplayImageWithDropdownDot;