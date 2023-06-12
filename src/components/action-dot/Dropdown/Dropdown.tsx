import {Layout, ButtonContainer, ButtonWrapper, Button} from "./styled";
import {FC} from "react";


interface DropdownProps {
  isVisible: boolean,
  onToggle: () => void,
  children: Array<ChildrenProps>,
}

export interface ChildrenProps {
  title: string,
  handler: () => void,
}

const Dropdown: FC<DropdownProps> = ({isVisible, onToggle, children}) => {

  function handleClick(handler: () => void) : void {
    handler();
    onToggle();
  }

  return (
    <Layout isVisible={isVisible}>
      <ButtonContainer>
        {children.map(({title, handler}, index) => (
          <ButtonWrapper key={index}>
            <Button
              onClick={() => handleClick(handler)}
            >
              {title}
            </Button>
          </ButtonWrapper>
        ))}
      </ButtonContainer>
    </Layout>
  )
}

export default Dropdown;