import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from "./main/Main";
import QuizDisplays from "./quiz/QuizDisplays";
import Navbar from "./navbar/Navbar";
import {useEffect} from "react";
import Display from "./quiz/Display";
import radiometer from "../images/radiometer.jpg";
import desktop from "../images/desktop.jpg";
import spectrometer from "../images/spectrometer.jpg";
import Doc from "./rad-doc/Doc";
import multiradDoc from "../docs/multirad.pdf";

function App() {

  useEffect(() => {
    function showClickCoord(evt) {
      console.log(`x: ${evt.clientX} y: ${evt.clientY}`);
    }

    document.addEventListener('click', showClickCoord);
    return () => {
      document.removeEventListener('click', showClickCoord);
    }
  })

  return (
    <>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quiz" element={<QuizDisplays />} />
          <Route path="/display" element={<Display
            pics={[
              radiometer,
              desktop,
              spectrometer
            ]}
          />}/>
          <Route path="/rad-doc" element={<Doc link={multiradDoc} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
