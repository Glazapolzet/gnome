import "./QuizDisplay.css"
import Display from "./Display"

export default function QuizDisplay () {
  return (
    <section className="QuizDisplay">
      <Display
        pics={[
          "https://tver-test.ru/netcat_files/multifile/2620/45/radiologicheskie_issledovaniya_2.jpg",
          "https://orenburg.media/wp-content/uploads/2020/11/118108_O.jpg",
          "https://i.ytimg.com/vi/YLkfPadPQdg/maxresdefault.jpg"
        ]}
      />
    </section>
  )
}