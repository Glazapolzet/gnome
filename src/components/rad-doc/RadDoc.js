import MoveBackArrow from "../back-arrow/MoveBackArrow";
import Doc from "./Doc";

export default function RadDoc (props) {
  return (
    <Doc file={props.file}>
      <MoveBackArrow leadingTo={-1}/>
    </Doc>
  )
}