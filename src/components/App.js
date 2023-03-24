import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from "./main/Main";
import QuizDisplay from "./quiz/QuizDisplay";
import Navbar from "./navbar/Navbar";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quiz" element={<QuizDisplay />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
