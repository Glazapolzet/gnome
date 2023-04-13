import "./StartArea.css"
import StartDisplay from "./StartDisplay";
import cabinet from "../../images/cabinet.jpg";
import ActionDot from "../action-dot/ActionDot";

export default function StartArea () {

  return (
    <section className="StartArea">
      <>
        <ActionDot
          y={530}
          x={725}
          leadingTo={"/display"}
        />
        <StartDisplay
          pic={cabinet}
        />
      </>
    </section>
  )

}