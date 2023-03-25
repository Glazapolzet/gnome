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
            top: props.y/627*100 + "%",
            left: props.x/1117*100 + "%"
          }}
        ></button>
      </Link>
      <Outlet />
    </>
  )
}
