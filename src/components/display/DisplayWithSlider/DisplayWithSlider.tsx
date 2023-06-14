import {Container} from "../styled";
import {Layout, BarLeft, BarRight, Arrow} from "./styled";
import {FC, ReactElement, useCallback, useEffect, useState} from "react";
import arrowLeft from "../../../images/chevron-left-circle.svg";
import arrowRight from "../../../images/chevron-right-circle.svg";


interface DisplayWithSliderProps {
  startSlide: string,
  sliderData: Record<string, ReactElement>,
}

const DisplayWithSlider: FC<DisplayWithSliderProps> = ({startSlide, sliderData}) => {

  const slides = Object.keys(sliderData);

  const endIndex = slides.length - 1;
  const [currentIndex, setCurrentIndex] = useState(slides.indexOf(startSlide));

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

      {slides.map((slide, index) => {
        return (
          <Layout
            key={index}
            isVisible={index === currentIndex}
          >
            {sliderData[slides[index]]}
          </Layout>
        )
      })}

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