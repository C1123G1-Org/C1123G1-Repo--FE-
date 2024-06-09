
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ExportCote from "./components/exportCote/exportCoteComponent";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthPage from './components/auth/AuthPage';
import PostsPage from './components/posts/LandingPostsPage/PostsPage';
import PostDetail from './components/posts/PostsDetail/PostDetail';
import Master from "./layouts/Master";
import Cote from "./pages/Cote";
import CoteDetail from "./pages/CoteDetail";
import Staff from "./pages/Staff";
import Pig from "./pages/Pig";
import Main from "./layouts/Main";
import "./assets/css/Main.css"
import Post from "./pages/Post";
import {AppContextProvider} from "./layouts/AppContext";


function App() {
  return (
    <>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Master />}>
            <Route path="cotes" element={<Cote />}></Route>
            <Route path="pigs" element={<Pig />}></Route>
            <Route path="cotes/detail/:id" element={<CoteDetail/>}></Route>
            <Route path="posts-mgt" element={<Post />} />
            <Route path="staff" element={<Staff />} />
            <Route path="" element={<Main />} />
            <Route path="export-cote" element={<ExportCote/>}/>
          </Route>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post-detail/:postId" element={<PostDetail />} />
          <Route path="/" element={<PostsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* <Route path="*" element={<div> Not Found or You do not have permission.</div>} /> */}
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
      <ToastContainer />

    </>
  );
}

export default App;
