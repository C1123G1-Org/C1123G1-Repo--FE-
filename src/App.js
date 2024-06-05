
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ExportCote from "./components/exportCote/exportCoteComponent";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PostsPage from "./components/posts/LandingPostsPage/PostsPage";
import PostDetail from "./components/posts/PostsDetail/PostDetail";
import Master from "./layouts/Master";
import Cote from "./pages/Cote";
import CoteDetail from "./pages/CoteDetail";
import Staff from "./pages/Staff";
import Main from "./layouts/Main";
import "./assets/css/Main.css"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/admin" element={<Master />}>
            <Route path="cotes" element={<Cote />}></Route>
            <Route path="cotes/detail/:id" element={<CoteDetail/>}></Route>
            <Route path="staff" element={<Staff />} />
            <Route path="" element={<Main />} />
            <Route path="export-cote" element={<ExportCote/>}/>
          </Route>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post-detail/:postId" element={<PostDetail />} />
          <Route path="/" element={<PostsPage />} />
          {/* <Route path="*" element={<div> Not Found or You do not have permission.</div>} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </>
  );
}

export default App;
