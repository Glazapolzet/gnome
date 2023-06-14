import styled from "styled-components/macro";

//TODO: Layout это часть внешних компонентов, которые будут использовать Display.

// export const Layout = styled.div`
//   width: 100%;
//   height: calc(100% - 65px);
//   margin: 65px 0 0 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

export const Container = styled.div`
  width: 80%;
  height: 85%;
  display: flex;
  position: relative;
  align-self: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
`