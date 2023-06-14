import {FC, ReactElement} from "react";
import {Container} from "../styled";


// interface DisplayProps {
//   srcImage: string,
//   dotX: number,
//   dotY: number,
//   dotCallback?: () => void,
//   dotDestination: string,
// }

interface DisplayProps {
  component: ReactElement,
}

const Display: FC<DisplayProps> = ({component}) => {
  return (
    <Container>
      {component}
    </Container>
  )

}

export default Display;
