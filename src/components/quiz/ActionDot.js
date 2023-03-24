import "./ActionDot.css";
import {Link, Outlet} from "react-router-dom";

export default function ActionDot (props) {
  return (
    <>
      <Link to={props.leadingTo}>
        <button
          type={"button"}
          className="ActionDot"
          style={{
            top: props.y,
            left: props.x
          }}
        ></button>
      </Link>
      <Outlet />
    </>
  )
}
