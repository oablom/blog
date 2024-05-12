import Topbar from "./components/Topbar/Topbar.jsx";
import Home from "./pages/home/Home.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Write from "./pages/write/Write.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Single from "./pages/single/Single.jsx";
import About from "./pages/about/About.jsx";
import { useState, useEffect } from "react";

import "./styling/app/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  const userLoggedIn = !!token;

  // useEffect(() => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("username");
  // }, []);

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={userLoggedIn ? <Home /> : <Register />}
        />
        <Route path="/login" element={userLoggedIn ? <Home /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/write"
          element={userLoggedIn ? <Write /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/settings"
          element={
            userLoggedIn ? <Settings /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
