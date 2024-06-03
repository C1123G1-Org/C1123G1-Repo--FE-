import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import PostsPage from './components/posts/LandingPostsPage/PostsPage';
import PostsRouter from "./components/posts/PostsRouter";
import Master from "./layouts/Master";
import Cote from "./pages/Cote";
import Pig from './pages/Pig';

// import TestGrid from './components/pigs/testGrid';
// import CreatePigForm from './components/pigs/createPigForm';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<Master />}>
            <Route path={"cotes"} element={<Cote />}></Route>
            <Route path={"pigs"} element={<Pig />}></Route>
          </Route>
        </Routes>
        <PostsRouter />
        <Routes>
          <Route path="/" element={<PostsPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
