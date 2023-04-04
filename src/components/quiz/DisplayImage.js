import './DisplayImage.css'
import ActionDot from "../action-dot/ActionDot";

export default function DisplayImage (props) {

  return (
    <>
      <img
        className="DisplayImage"
        src={props.pic}
        alt={props.pic}
        loading={"lazy"}
      />
      {props.withDot ? (
        <ActionDot
          y={props.dotY}
          x={props.dotX}
          leadingTo={props.dotLeadingTo}
          onClick={props.dotOnClick}
          dropdown={props.dotDropdown}
        />
      ) : null}
    </>
  )
}