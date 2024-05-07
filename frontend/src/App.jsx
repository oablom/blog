import { useState } from "react";
import Topbar from "./components/Topbar/Topbar.jsx";
import Home from "./pages/home/Home.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Write from "./pages/write/Write.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Single from "./pages/single/Single.jsx";
import "./styling/app/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const user = false;

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/write" element={user ? <Home /> : <Write />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/settings" element={user ? <Home /> : <Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
