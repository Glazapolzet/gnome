import "./QuizDisplays.css"
import StartDisplay from "./StartDisplay";
import cabinet from "../../images/cabinet.jpg";
import ActionDot from "./ActionDot";

export default function QuizDisplays () {

  return (
    <section className="QuizDisplays">
      <>
        <ActionDot
          y={389}
          x={542}
          leadingTo={"/display"}
        />
        <StartDisplay
          pic={cabinet}
        />
      </>
    </section>
  )

}