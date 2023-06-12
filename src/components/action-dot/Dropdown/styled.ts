import styled from "styled-components";


interface LayoutProps {
  isVisible: boolean,
}

export const Layout = styled.div<LayoutProps>`
  visibility: ${({isVisible}) => isVisible ? 'visible' : 'hidden'};
  min-width: 120px;
  background-color: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  position: absolute;
  top: 50%;
  left: 100%;
  z-index: 1;
`

export const ButtonContainer = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  list-style: none;
`

export const ButtonWrapper = styled.li`
`

export const Button = styled.button`
  padding: 8px;
  color: #444444;
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 16px;
  font-style: inherit;
  text-align: start;
  cursor: pointer;
  
  &:hover {
    background-color: #EBEBEB;
  }
`
