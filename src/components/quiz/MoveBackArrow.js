import './MoveBackArrow.css';
import backArrow from '../../images/arrow-left-large.svg';
import { Link } from "react-router-dom";

export default function MoveBackArrow (props) {
  return (
    <>
      <Link to={props.leadingTo}>
        <button
          type="button"
          className="MoveBackArrow"
          style={{
            backgroundImage: `url(${backArrow})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
          }}
        />
      </Link>
    </>
  )
}

