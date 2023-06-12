import {FC, useState} from "react";
import {Layout, Button} from "../styled";
import Dropdown from "../Dropdown";
import type {DropdownProps} from "../Dropdown";

interface ActionDotWithDropdownProps {
  xCoord: number,
  yCoord: number,
  dropdown: Array<DropdownProps>,
}

const ActionDotWithDropdown: FC<ActionDotWithDropdownProps> = ({xCoord, yCoord, dropdown}) => {

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  function toggleDropdown() : void {
    setDropdownVisible(!isDropdownVisible);
  }

  return (
    <Layout
      x={xCoord}
      y={yCoord}
    >
      <Button onClick={toggleDropdown}/>
      <Dropdown
        isVisible={isDropdownVisible}
        onToggle={toggleDropdown}
      >
        {dropdown}
      </Dropdown>
    </Layout>
  )

}

export default ActionDotWithDropdown;