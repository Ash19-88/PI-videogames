import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from './components/Landing/LandingPage'
import Home from './components/Home/Home';
import Detail from './components/Details/Detail';
import CreateVideogame from './components/Form/CreateVideogame';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Route exact path="/" component={LandingPage} />
    <Route path="/home" component={Home} />
    <Route path="/videogames/:id" component={Detail} />
    <Route path="/create" component={CreateVideogame} />
    </div>
    </BrowserRouter>
  );
}

export default App;
