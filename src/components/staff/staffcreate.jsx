import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";

import * as staffService from "../../services/StaffService";

export const StaffCreate = ({ show, closeModal }) => {
  const [errorCode, setErrorCode] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorIdenty, setErrorIdenty] = useState("");

  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );

  useEffect(() => {
    console.log(errorCode);
    console.log(errorUsername);
    console.log(errorIdenty);
  }, [errorCode, errorUsername, errorIdenty]);

  const handleCreateStaff = async (value) => {
    console.log("ok");
    try {
      const res = await staffService.getCreateStaff(value);
      let result;
      if (res) {
        result = res.toString().split("");
      }
      if (result) {
        if (result.includes("1")) {
          setErrorCode("Mã đã tồn tại");
        } else {
          setErrorCode("");
        }
        if (result.includes("2")) {
          setErrorUsername("Tên đăng nhập đã tồn tại");
        } else {
          setErrorUsername("");
        }
        if (result.includes("3")) {
          setErrorIdenty("Căn cước đã tồn tại");
        } else {
          setErrorIdenty("");
        }
      } else {
        setErrorCode("");
        setErrorUsername("");
        setErrorIdenty("");
        closeModal();
        toast.success("thêm mới thành công");
      }
    } catch (error) {
      toast.error("thêm mới thất bại");
    }
  };

  const vali = {
    code: Yup.string()
      .required("vui lòng không để trống")
      .min(3, "Nhập ít nhất 3 kí tự")
      .matches(/^N[0-9].$/, "nhập theo định dạng : N**"),
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
      <Modal show={show} className="vivi">
        <ModalHeader className="tieude">
          {" "}
          <div style={{ fontSize: "20px" }}>Thêm Nhân Viên </div>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex">
            <div className="col-11 vi2">
              <Formik
                initialValues={{
                  code: "",
                  password: "",
                  fullName: "",
                  email: "",
                  username: "",
                  identityCode: "",
                }}
                onSubmit={handleCreateStaff}
                validationSchema={Yup.object(vali)}
              >
                <Form>
                  <table>
                    <tr>
                      <td>Mã nhân viên: </td>
                      <td>
                        <Field type="text" name="code" required></Field>
                        <ErrorMessage
                          name="code"
                          component={"div"}
                          style={{ color: "red" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <div>
                          <span>{errorCode}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td> Họ và tên: </td>
                      <td>
                        <Field type="text" name="fullName" required></Field>
                        <ErrorMessage
                          name="fullName"
                          component={"div"}
                          style={{ color: "red" }}
                        />
                      </td>
                    </tr>
                    <td></td>
                    <tr>
                      <td> Tên tài khoản: </td>
                      <td>
                        <Field type="text" name="username" required></Field>
                        <ErrorMessage
                          name="username"
                          component={"div"}
                          style={{ color: "red" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <div>
                          <span>{errorUsername}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td> Mật khẩu: </td>
                      <td>
                        <Field type="text" name="password" required></Field>
                      </td>
                    </tr>
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
                        <Field
                          type="number"
                          name="identityCode"
                          required
                        ></Field>
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
                    Lưu
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
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
