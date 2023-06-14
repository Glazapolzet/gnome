import styled from "styled-components/macro";
import eyeIcon from "../../images/check_eye.svg";


interface LayoutProps {
  x: number,
  y: number,
}

export const Layout = styled.div<LayoutProps>`
  position: absolute;
  display: flex;
  z-index: 1;

  left: ${({x}) => x/window.innerWidth*100 + "%"};
  top: ${({y}) => y/window.innerHeight*100 + "%"};
`

export const Button = styled.button`
  position: relative;
  margin: 0;
  padding: 0;
  background-image: url(${eyeIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #fff;
  border: 2px solid #444;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: transform 0.2s ease-out;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.4);
  }
`
