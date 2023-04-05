import "./Display.css"
import {useEffect, useState} from "react";
import MoveBackArrow from "./../back-arrow/MoveBackArrow";
import {Outlet, useNavigate} from "react-router-dom";

export default function Display(props) {

  const [currentPicIndex, setCurrentPicIndex] = useState(props.defaultPicIndex);
  const [currentPic, setCurrentPic] = useState(props.pics[props.defaultPicIndex]);
  const [isPicOnChange, setPicOnChange] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("set");
  //   setCurrentPicIndex(props.defaultPicIndex);
  //   setCurrentPic(props.pics[props.defaultPicIndex]);
  // }, [props.pics, props.defaultPicIndex])

  useEffect(() => {
    if (isPicOnChange) {
      console.log(isPicOnChange);
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