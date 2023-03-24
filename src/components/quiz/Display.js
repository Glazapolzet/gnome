import "./Display.css"
import { useState } from "react";
import MoveBackArrow from "./MoveBackArrow";

export default function Display(props) {

  const [currentPicIndex, setCurrentPicIndex] = useState(1);

  function handleLeftArrowClick () {
    if (currentPicIndex !== 0) {
      setCurrentPicIndex(currentPicIndex-1);
    }
  }

  function handleRightArrowClick () {
    if (currentPicIndex !== props.pics.length-1) {
      setCurrentPicIndex(currentPicIndex+1);
    }
  }

  // TODO: плавные переходы между картинками

  return (
    <section className="Display">
      <MoveBackArrow
        leadingTo={"/quiz"}
      />
      <div className="Display__image-container">
        <div className="Display__bar Display__left-bar">
          <div
            className="Display__arrow Display__left-arrow"
            onClick={handleLeftArrowClick}
          />
        </div>
        <div
          className="Display__image"
          style={{
            backgroundImage: `url(${props.pics[currentPicIndex]})`
          }}
        />
        <div className="Display__bar Display__right-bar">
          <div
            className="Display__arrow Display__right-arrow"
            onClick={handleRightArrowClick}
          />
        </div>
      </div>
    </section>
  )
}