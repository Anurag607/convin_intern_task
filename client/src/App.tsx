import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/register"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
