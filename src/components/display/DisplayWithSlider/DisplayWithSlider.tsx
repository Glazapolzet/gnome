import {Container} from "../styled";
import {BarLeft, BarRight, Arrow} from "./styled";
import {FC, ReactElement, useEffect, useState} from "react";
import arrowLeft from "../../../images/chevron-left-circle.svg";
import arrowRight from "../../../images/chevron-right-circle.svg";


interface DisplayWithSliderProps {
  startSlide: string,
  sliderData: Record<string, ReactElement>,
}

const DisplayWithSlider: FC<DisplayWithSliderProps> = ({startSlide, sliderData}) => {

  const slides = Object.keys(sliderData);
  const [currentSlide, setCurrentSlide] = useState(sliderData.startSlide);

  const endIndex = slides.length - 1;
  const [currentIndex, setCurrentIndex] = useState(slides.indexOf(startSlide));

  useEffect(() => {
    setCurrentSlide(sliderData[slides[currentIndex]]);
  }, [currentIndex])

  function nextSlide() {
    setCurrentIndex((currentIndex) => currentIndex === endIndex
      ? currentIndex
      : currentIndex + 1
    );
  }

  function prevSlide() {
    setCurrentIndex((currentIndex) => currentIndex === 0
      ? currentIndex
      : currentIndex - 1
    );
  }

  return (
    <Container>
      <BarLeft>
        <Arrow
          src={arrowLeft}
          onClick={prevSlide}
        />
      </BarLeft>

      {currentSlide}

      <BarRight>
        <Arrow
          src={arrowRight}
          onClick={nextSlide}
        />
      </BarRight>
    </Container>
  )

}

export default DisplayWithSlider;