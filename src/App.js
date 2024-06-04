import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ExportCote from "./components/exportCote/exportCoteComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ExportCote/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
