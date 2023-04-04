import './App.css';

import { FormContext } from "../formContext/formContext";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

import Main from "./main/Main";
import StartArea from "./quiz/StartArea";
import Navbar from "./navbar/Navbar";

import Display from "./quiz/Display";
import DisplayImage from "./quiz/DisplayImage";
import radiometer from "../images/radiometer.jpg";
import desktop from "../images/desktop.jpg";
import spectrometer from "../images/spectrometer.jpg";
import Doc from "./rad-doc/Doc";
import multiradDoc from "../docs/multirad.pdf";

import caseClosed from "../images/case_closed.jpg";
import table from "../images/table_temp.jpg";

function App() {

  //TODO: navigate лагает как сука

  // const navigate = useNavigate();

  useEffect(() => {
    function showClickCoord(evt) {
      console.log(`x: ${evt.screenX} y: ${evt.screenY-65}`);
    }

    document.addEventListener('click', showClickCoord);
    return () => {
      document.removeEventListener('click', showClickCoord);
    }
  })

  const [isFormOnSubmit, setFormSubmitStatus] = useState(false);
  //!!!
  const [isDesktopClicked, setDesktopClicked] = useState(true);

  function handleDesktopClick () {
    setDesktopClicked(true);
    // navigate('/window');
  }

  return (
    <FormContext.Provider value={{isFormOnSubmit, setFormSubmitStatus}}>
      <div className="App">
        <Navbar
          isDesktopClicked={isDesktopClicked}
        />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quiz" element={<StartArea />} />
          <Route path="/display" element={<Display
            defaultPicIndex={1}
            pics={[
              "radiometer",
              "desktop",
              "spectrometer"
            ]}/>}
          >
            <Route path="radiometer" element={<DisplayImage
              pic={radiometer}
              withDot={true}
              dotLeadingTo={'/buttons'}
              dotX={500}
              dotY={300}
            />}/>

            <Route path="desktop" element={<DisplayImage
              pic={desktop}
              withDot={true}
              dotX={255}
              dotY={45}
              dotDropdown={[
                {
                  id: 11,
                  title: 'Запуск ПО «Прогресс»',
                  handler: handleDesktopClick
                },
              ]}
            />}/>

            <Route path="spectrometer" element={<DisplayImage
              pic={spectrometer}
              withDot={true}
              dotLeadingTo={'/spec-area'}
              dotX={935}
              dotY={10}
            />}/>
          </Route>
          {/*TODO: сделать норм фотку стола*/}
          <Route path={'/spec-area'} element={<Display
            defaultPicIndex={0}
            pics={[
              "case",
              "table",
            ]}/>}>

            <Route path="case" element={<DisplayImage
              pic={caseClosed}
              withDot={true}
              dotX={500}
              dotY={300}
            />}/>

            <Route path="table" element={<DisplayImage
              pic={table}
              withDot={true}
              dotX={500}
              dotY={300}
            />}/>
          </Route>
          <Route path="/rad-doc" element={<Doc link={ multiradDoc } />} />
        </Routes>
      </div>
    </FormContext.Provider>
  );
}

export default App;
