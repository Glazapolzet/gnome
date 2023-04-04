import './MoveBackArrow.css';
import backArrow from '../../images/arrow-left-large.svg';
import {useNavigate} from "react-router-dom";

export default function MoveBackArrow (props) {

  const navigate = useNavigate();

  function handleClick () {
    navigate(props.leadingTo);
  }

  return (
    <button
      type="button"
      className="MoveBackArrow"
      style={{
        backgroundImage: `url(${backArrow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
      }}
      onClick={handleClick}
    />
  )
}

