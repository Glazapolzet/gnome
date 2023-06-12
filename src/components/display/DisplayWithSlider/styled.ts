import styled from "styled-components";


interface ArrowProps {
  src: any,
}

export const Bar = styled.div`
  position: absolute;
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
`

export const BarLeft = styled(Bar)`
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  left: 0;
`

export const BarRight = styled(Bar)`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  left: calc(100% - 68px);
`

export const Arrow = styled.div<ArrowProps>`
  background-image: url(${({src}) => src});
  width: 48px;
  height: 48px;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
  cursor: pointer;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  
  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }
`