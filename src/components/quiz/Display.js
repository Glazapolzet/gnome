import "./Display.css"
import {useEffect, useState} from "react";
import MoveBackArrow from "./../back-arrow/MoveBackArrow";
import {Outlet, useNavigate} from "react-router-dom";

export default function Display(props) {

  const i = props.defaultPicIndex;
  const defaultPic = props.pics[i];

  const [currentPicIndex, setCurrentPicIndex] = useState(i);
  const [currentPic, setCurrentPic] = useState(defaultPic);
  const [isPicOnChange, setPicOnChange] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setPicOnChange(true);
    setCurrentPicIndex(i);
    setCurrentPic(defaultPic);
  }, [defaultPic, i])

  useEffect(() => {
    if (isPicOnChange) {
      navigate(currentPic);
      setPicOnChange(false);
    }
  }, [isPicOnChange, currentPic, navigate])

  function handleLeftArrowClick () {
    if (currentPicIndex !== 0) {
      const i = currentPicIndex;
      setCurrentPicIndex(i-1);
      setCurrentPic(props.pics[i-1]);
      setPicOnChange(true);
    }
  }

  function handleRightArrowClick () {
    if (currentPicIndex !== props.pics.length-1) {
      const i = currentPicIndex;
      setCurrentPicIndex(i+1);
      setCurrentPic(props.pics[i+1]);
      setPicOnChange(true);
    }
  }

  return (
    <section className="Display">
      <MoveBackArrow
        leadingTo={props.backArrowTo}
        isDisabled={false}
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