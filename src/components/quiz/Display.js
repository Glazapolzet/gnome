import "./Display.css"
import {useEffect, useState} from "react";
import MoveBackArrow from "../back-arrow/MoveBackArrow";
import {Outlet, useNavigate} from "react-router-dom";

export default function Display(props) {

  const [currentPicIndex, setCurrentPicIndex] = useState(props.defaultPicIndex);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPicIndex(props.defaultPicIndex);
  }, [props.defaultPicIndex])

  useEffect(() => {
    navigate(props.pics[currentPicIndex]);
  }, [currentPicIndex, navigate, props.pics])

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

  return (
    <section className="Display">
      <MoveBackArrow
        leadingTo={'/quiz'}
      />
      <div className="Display__image-container">
        <div className="Display__bar Display__left-bar">
          <div
            className="Display__arrow Display__left-arrow"
            onClick={handleLeftArrowClick}
          />
        </div>
        <Outlet/>
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