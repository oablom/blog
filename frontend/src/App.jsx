import { useState } from "react";
import Topbar from "./components/Topbar/Topbar.jsx";
import Home from "./pages/Home.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";
import "./styling/app/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Topbar />
      {/* <Home />
       */}
      <SinglePostPage />
    </>
  );
}

export default App;
