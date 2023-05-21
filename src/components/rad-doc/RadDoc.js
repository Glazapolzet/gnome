import MoveBackArrow from "../back-arrow/MoveBackArrow";
import Doc from "./Doc";
import "./RadDoc.css";

export default function RadDoc (props) {
  return (
    <div className="RadDoc">
      <Doc file={props.file}>
        <MoveBackArrow leadingTo={-1}/>
      </Doc>
    </div>
  )
}