import "./ActionDot.css";
import {useNavigate} from "react-router-dom";

export default function ActionDot (props) {

  const navigate = useNavigate();

  function handleClick() {
    if (props.leadingTo) {
      navigate(props.leadingTo);
    }
  }

  return (
    <button
      type={"button"}
      className="ActionDot"
      style={{
        top: props.y/880*100 + "%",
        left: props.x/1512*100 + "%"
      }}
      onClick={handleClick}
    />
  )
}
