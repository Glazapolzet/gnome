import {Container} from "../styled";
import {Layout, BarLeft, BarRight, Arrow} from "./styled";
import {FC, ReactElement, useState} from "react";
import arrowLeft from "../../../images/chevron-left-circle.svg";
import arrowRight from "../../../images/chevron-right-circle.svg";


interface DisplayWithSliderProps {
  startComponentName: string,
  componentData: Record<string, ReactElement>,
}

const DisplayWithSlider: FC<DisplayWithSliderProps> = ({startComponentName, componentData}) => {

  const componentsName = Object.keys(componentData);

  const endIndex = componentsName.length - 1;
  const [currentIndex, setCurrentIndex] = useState(componentsName.indexOf(startComponentName));

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

      {componentsName.map((componentName, index) => {
        return (
          <Layout
            key={index}
            isVisible={index === currentIndex}
          >
            {componentData[componentName]}
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