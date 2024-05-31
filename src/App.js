import "./App.css";
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowCotesList from "./components/cote/CotesList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <>
    {/* <BrowserRouter>
    <Routes>
      <Route path='/cotes' element={<ShowCoteList/>}></Route>
    </Routes>
    </BrowserRouter> */}
    <ShowCotesList/>
    <ToastContainer/>
    </>
  );
}

export default App;
