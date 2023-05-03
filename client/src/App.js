import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Details/Detail";
import CreateVideogame from "./components/Form/CreateVideogame";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = '';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/videogames/:id" element={<Detail />} />
          <Route path="/create" element={<CreateVideogame />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
