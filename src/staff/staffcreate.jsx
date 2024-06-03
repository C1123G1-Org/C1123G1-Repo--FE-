// import { Field, Formik, Form } from "formik";
// import React, { useEffect, useState } from "react";
// import { getAllStaff, getCreateStaff } from "../staffService/StaffService";
// import { useNavigate } from "react-router-dom";
// import { Container } from "react-bootstrap";

// export const StaffCreate = () => {
//   const [staff, setStaff] = useState();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getAll = () => {
//       getAllStaff().then((res) => {
//         setStaff(res);
//       });
//     };
//     getAll();
//   }, []);

//   return (
//     <Container>
//       <div>
//         <div class="modal" tabindex="-1" role="dialog">
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <h5 class="modal-title">Modal title</h5>
//                 <button
//                   type="button"
//                   class="close"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div class="modal-body">
//                 <p>Modal body text goes here.</p>
//                 <Formik
//                   initialValues={{
//                     code: "",
//                     username: "",
//                     password: "",
//                     fullName: "",
//                     email: "",
//                     gender: true,
//                     identityCode: "",
//                     status: true,
//                   }}
//                   onSubmit={(values, { setSubmitting }) => {
//                     getCreateStaff(values)
//                       .then((res) => {
//                         navigate("/staff");
//                       })
//                       .catch((err) => {
//                         console.log(err);
//                       })
//                       .finally(() => {
//                         setSubmitting(false);
//                       });
//                   }}
//                 >
//                   {({ isSubmitting }) => (
//                     <Form>
//                       <div className="form-group">
//                         <label>code</label>
//                         <Field
//                           type="text"
//                           name="code"
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>username</label>
//                         <Field
//                           type="text"
//                           name="username"
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>password</label>
//                         <Field
//                           type="date"
//                           name="password"
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>fullName</label>
//                         <Field
//                           type="date"
//                           name="fullName"
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>email</label>
//                         <Field
//                           type="date"
//                           name="email"
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>gender</label>
//                         <Field
//                           type="date"
//                           name="gender"
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>identityCode</label>
//                         <Field
//                           type="date"
//                           name="identityCode"
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>status</label>
//                         <Field
//                           type="date"
//                           name="status"
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                       <div className="mt-3">
//                         <button type="submit" className="btn btn-primary">
//                           Submit
//                         </button>
//                       </div>
//                     </Form>
//                   )}
//                   ;
//                 </Formik>
//               </div>
//               <div class="modal-footer">
//                 <button type="button" class="btn btn-primary">
//                   Save changes
//                 </button>
//                 <button
//                   type="button"
//                   class="btn btn-secondary"
//                   data-dismiss="modal"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };
