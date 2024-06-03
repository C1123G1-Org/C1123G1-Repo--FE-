import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { StaffComponent } from "./staff/staffcomponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaffCreate } from "./staff/staffcreate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}>
          <Route index element={<ProductApp />} /> */}
          <Route path="/staff" element={<StaffComponent />} />
          <Route path="/staff/create" element={<StaffCreate />} />
          {/* <Route path="product/edit/:id" element={<ProductEdit />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
