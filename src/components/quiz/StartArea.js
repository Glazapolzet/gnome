import "./StartArea.css"
import StartDisplay from "./StartDisplay";
import cabinet from "../../images/cabinet.jpg";
import ActionDot from "../action-dot/ActionDot";

export default function StartArea (props) {

  return (
    <section className="StartArea">
      <>
        <ActionDot
          y={530}
          x={725}
          // leadingTo={"/display"}
          onClick={props.onClick}
        />
        <StartDisplay
          pic={cabinet}
        />
      </>
    </section>
  )

}