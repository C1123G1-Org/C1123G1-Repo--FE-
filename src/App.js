import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import Master from "./layouts/Master";
import {Route, Routes} from "react-router-dom";
import Cote from "./pages/Cote";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <>
        <Routes>
            <Route path='/admin' element={<Master/>}>
                <Route path={"cotes"} element={<Cote/>}></Route>
            </Route>
        </Routes>
        <ToastContainer />
    </>
  );
}

export default App;
