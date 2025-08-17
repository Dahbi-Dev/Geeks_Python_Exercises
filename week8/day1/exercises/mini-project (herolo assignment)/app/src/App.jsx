import { Routes, Route } from "react-router";
import './App.css'
import Header from "./Components/Header";
import Home from "./Components/Home";
import Favorites from "./Components/Favorites";


function App() {
  return (
    <div className="text-black">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
