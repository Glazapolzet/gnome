import "./StartArea.css"
import StartDisplay from "./StartDisplay";
import cabinet from "../../images/cabinet.jpg";
import ActionDot from "./ActionDot";

export default function StartArea () {

  return (
    <section className="QuizDisplays">
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