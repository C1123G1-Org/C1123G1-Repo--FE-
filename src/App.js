import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import PostsRouter from "./components/posts/PostsRouter";
import Master from "./layouts/Master";
import Cote from "./pages/Cote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<Master />}></Route>
          <Route path={"cotes"} element={<Cote />}></Route>
        </Routes>
        <PostsRouter />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
