import './DisplayImage.css'
import ActionDot from "./ActionDot";

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
        />
      ) : null}
    </>
  )
}