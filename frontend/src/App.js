import Navbar from "./content/Navbar"
import Content from "./content/Content"
import { BrowserRouter as Router } from "react-router-dom"
import './App.css'

function App() {
  return (
    <Router>      
      <Navbar/>
      <Content/>
    </Router>
  );
}

export default App