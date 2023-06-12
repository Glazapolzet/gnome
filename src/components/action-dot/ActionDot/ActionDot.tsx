import {useNavigate} from "react-router-dom";
import {FC} from "react";
import {Layout, Button} from "../styled";


interface ActionDotProps {
  xCoord: number,
  yCoord: number,
  destination: string,
  callback?: () => void,
}

const ActionDot: FC<ActionDotProps> = ({xCoord, yCoord, callback, destination}) => {

  const navigate = useNavigate();

  function handleClick() : void {
    if (!!callback) {
      callback();
    }

    navigate(destination);
  }

  return (
    <Layout
      x={xCoord}
      y={yCoord}
    >
      <Button onClick={handleClick}/>
    </Layout>
  )
}

export default ActionDot;