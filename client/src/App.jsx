import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/about" element={ <About /> } />
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={ <Login /> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;