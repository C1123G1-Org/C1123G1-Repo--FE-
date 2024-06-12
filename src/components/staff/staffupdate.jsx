import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as service from "../../services/StaffService";
import * as Yup from "yup";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import * as staffService from "../../services/StaffService";
import { toast } from "react-toastify";

export const StaffUpdate = ({ showUpdate, closeModal, id }) => {
  const [staff, setStaff] = useState();
  const [errorCode, setErrorCode] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorIdenty, setErrorIdenty] = useState("");
  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );

  const getStaff = async () => {
    try {
      console.log(`current id: ${id}`);
      const res = await service.findByID(id);
      setStaff(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateStaff = async (value, id) => {
    try {
      const res = await staffService.getUpdateStaff(value, id);
      let result;
      if (res) {
        result = res.toString().split("");
      }
      if (result) {
        if (result.includes("3")) {
          setErrorIdenty("Căn cước đã tồn tại");
        } else {
          setErrorIdenty("");
        }
      } else {
        setErrorIdenty("");
        closeModal();
        toast.success("update thành công");
      }
    } catch (error) {
      toast.success("update thất bại.");
    }
  };

  useEffect(() => {
    console.log(`staff: ${staff}`);
    console.log(id);
  }, [id, staff]);

  useEffect(() => {
    getStaff();
  }, [showUpdate, id]);

  if (!staff) {
    return <div></div>;
  }
  const vali = {
    // code: Yup.string()
    //   .required("vui lòng không để trống")
    //   .min(3, "Nhập ít nhất 3 kí tự")
    //   .matches(/^NV[0-9].$/, "nhập theo định dạng : N**"),
    identityCode: Yup.number()
      .typeError("vui lòng nhập số")
      .required("vui lòng không để trống"),
    email: Yup.string()
      .required("vui lòng không để trống")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "nhập đúng định dạng : **@gmail.com"
      ),
    date: Yup.date()
      .max(minAgeDate, "Bạn chưa đủ 18 tuổi!")
      .required("Ngày sinh không được bỏ trống"),
  };
  return (
    <div>
      {" "}
      <div>
        <Modal show={showUpdate} className="vivi">
          <ModalHeader className="tieude">
            {" "}
            <div style={{ fontSize: "20px" }}>Chỉnh sửa</div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex">
              <div className="col-11 vi2">
                <Formik
                  initialValues={staff}
                  onSubmit={(values) => {
                    handleUpdateStaff(values);
                  }}
                  validationSchema={Yup.object(vali)}
                >
                  <Form>
                    <table>
                      {/* <tr>
                        <td>Mã nhân viên: </td>
                        <td>
                          <Field type="text" name="code"></Field>
                          <ErrorMessage
                            name="code"
                            component={"div"}
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr> */}
                      {/* <td></td> */}
                      {/* <td>
                        <div>
                          <span>{errorCode}</span>
                        </div>
                      </td> */}
                      <tr>
                        <td> Họ và tên: </td>
                        <td>
                          <Field type="text" name="fullName"></Field>
                          <ErrorMessage
                            name="fullName"
                            component={"div"}
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr>
                      <td></td>
                      {/* <tr>
                        <td> Tên tài khoản: </td>
                        <td>
                          <Field type="text" name="username"></Field>
                          <ErrorMessage
                            name="username"
                            component={"div"}
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr> */}
                      {/* <td></td> */}
                      {/* <td>
                        <div>
                          <span>{errorUsername}</span>
                        </div>
                      </td> */}
                      {/* <tr>
                        <td> Mật khẩu: </td>
                        <td>
                          <Field type="text" name="password"></Field>
                        </td>
                      </tr> */}
                      <td></td>
                      <tr>
                        <td> Email: </td>
                        <td>
                          <Field type="text" name="email"></Field>
                          <ErrorMessage
                            name="email"
                            component={"div"}
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr>
                      <td></td>
                      <tr>
                        <td>Ngày sinh: </td>
                        <td>
                          <Field type="Date" name="date" required></Field>
                          <ErrorMessage
                            name="date"
                            component={"div"}
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr>
                      <td></td>
                      <tr>
                        <td> Giới tính: </td>
                        <td>
                          <Field as="select" name="gender" required>
                            <option selected disabled value="">
                              ---
                            </option>
                            <option value="true">Nữ</option>
                            <option value="false">Nam</option>
                          </Field>
                        </td>
                      </tr>
                      <td></td>
                      <tr>
                        <td> CMND: </td>
                        <td>
                          <Field type="number" name="identityCode"></Field>
                          <ErrorMessage
                            name="identityCode"
                            component={"div"}
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <span>{errorIdenty}</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <button type="submit" className="k-btn">
                      sửa
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                closeModal();
              }}
              className="btn btn-closeeee"
            >
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
