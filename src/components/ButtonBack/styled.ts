import styled from "styled-components";


interface ButtonProps {
  src: any,
}

export const Button = styled.button<ButtonProps>`
  background-image: url(${({src}) => src});
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0;
  padding: 0;
  border: none;
  position: fixed;
  width: 48px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.55);
  opacity: 0.8;
  cursor: pointer;
  left: 0;
  z-index: 2;
`