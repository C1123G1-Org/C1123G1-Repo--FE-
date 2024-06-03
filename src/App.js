<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { StaffComponent } from "./staff/staffcomponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaffCreate } from "./staff/staffcreate";
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import PostsPage from './components/posts/LandingPostsPage/PostsPage';
import PostDetail from './components/posts/PostsDetail/PostDetail';
import Master from "./layouts/Master";
import Cote from "./pages/Cote";
>>>>>>> 619d8dde0c042e772b7426247a759a2788383287

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          {/* <Route path="/" element={<Layout />}>
          <Route index element={<ProductApp />} /> */}
          <Route path="/staff" element={<StaffComponent />} />
          <Route path="/staff/create" element={<StaffCreate />} />
          {/* <Route path="product/edit/:id" element={<ProductEdit />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
=======
          <Route path='/admin' element={<Master />}>
            <Route path={"cotes"} element={<Cote />}></Route>
          </Route>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post-detail/:postId" element={<PostDetail />} />
          <Route path="/" element={<PostsPage />} />
          {/* <Route path="*" element={<div> Not Found or You do not have permission.</div>} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
>>>>>>> 619d8dde0c042e772b7426247a759a2788383287
    </>
  );
}

export default App;
