import { useState } from "react";
import Topbar from "./components/Topbar/Topbar.jsx";
import Home from "./pages/Home.jsx";
import "./styling/app/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Topbar />
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </>
  );
}

export default App;
