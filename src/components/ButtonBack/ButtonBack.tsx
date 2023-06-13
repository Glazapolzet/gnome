import {useNavigate} from "react-router-dom";
import {FC} from "react";
import {Button} from "./styled";
import backArrow from '../../images/arrow-left-large.svg';


interface ButtonBackProps {
  destination: string,
}

const ButtonBack: FC<ButtonBackProps> = ({destination}) => {

  const navigate = useNavigate();

  function handleClick() {
    navigate(destination);
  }

  return (
    <Button
      src={backArrow}
      onClick={handleClick}
    />
  )

}

export default ButtonBack;
