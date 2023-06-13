import {Wrapper} from "./styled";
import {Outlet} from "react-router-dom";


const GameArea = () => {
  return (
    <Wrapper>
      <Outlet/>
    </Wrapper>
  )
}

export default GameArea;