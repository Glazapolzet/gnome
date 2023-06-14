import {Layout} from "./styled";
import {Outlet} from "react-router-dom";


const GameContent = () => {
  return (
    <Layout>
      <Outlet/>
    </Layout>
  )
}

export default GameContent;