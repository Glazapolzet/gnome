import {Layout} from "./styled";
import Navbar from "../navbar/Navbar";
import {FC} from "react";
import {Outlet} from "react-router-dom";


interface TempProps {
  isDesktopClicked: boolean,
  resetPages: () => void,
}

//TODO: это старые пропсы от навбара, пока оставила в качестве заглушки
const Content: FC<TempProps> = ({isDesktopClicked, resetPages}) => {
  return (
    <>
      <Navbar
        isDesktopClicked={isDesktopClicked}
        resetPages={resetPages}
      />
      <Layout>
        <Outlet/>
      </Layout>
    </>
  )
}

export default Content;