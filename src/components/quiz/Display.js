import "./Display.css"
import { useState } from "react";

export default function Display(props) {

  const [currentPicIndex, setCurrentPicIndex] = useState(1);
  const [isLeftGalleryEnd, setLeftGalleryEndState] = useState(false);
  const [isRightGalleryEnd, setRightGalleryEndState] = useState(false);

  function handleLeftArrowClick () {
    if (currentPicIndex === 0) {
      setLeftGalleryEndState(true);
    } else {
      setCurrentPicIndex(currentPicIndex-1);
    }
  }

  function handleRightArrowClick () {
    if (currentPicIndex === props.pics.length-1) {
      setRightGalleryEndState(true);
    } else {
      setCurrentPicIndex(currentPicIndex+1);
    }
  }

  return (
    <div className="Display">
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
    </div>
  )
}