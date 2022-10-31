import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SidePopup from "./components/SidePopup";

function App() {
  const [popUp, setPopUp] = useState(false);
  return (
    <div className="App">
      <div className="navbar"></div>
      <button className="outline-light" onClick={() => setPopUp(true)}>
        Save segment
      </button>
      {popUp && <SidePopup pop={setPopUp} />}
    </div>
  );
}

export default App;
