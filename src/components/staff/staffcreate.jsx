import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";

import { toast } from "react-toastify";

import * as staffService from "../../services/StaffService";
import { Try } from "@mui/icons-material";

export const StaffCreate = ({ show, closeModal }) => {
  const [errorCode, setErrorCode] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorIdenty, setErrorIdenty] = useState("");
  const [a, setA] = useState([]);

  useEffect(() => {
    console.log(errorCode);
    console.log(errorUsername);
    console.log(errorIdenty);
  }, [errorCode, errorUsername, errorIdenty]);

  const handleCreateStaff = async (value) => {
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
        console.log("ko co");
      }
    } catch (error) {
      toast.error("thêm mới thất bại");
    }
  };

  return (
    <div>
      <Modal show={show} className="vivi">
        <ModalHeader>Tao moi</ModalHeader>

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
              >
                <Form>
                  <table>
                    <tr>
                      <td>Mã nhân viên: </td>
                      <td>
                        <Field type="text" name="code" required></Field>
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
                      <td> họ và tên: </td>
                      <td>
                        <Field type="text" name="fullName" required></Field>
                      </td>
                    </tr>
                    <tr>
                      <td> tên tài khoản: </td>
                      <td>
                        <Field type="text" name="username" required></Field>
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
                      <td> mật khẩu: </td>
                      <td>
                        <Field type="text" name="password" required></Field>
                      </td>
                    </tr>
                    <tr>
                      <td> email: </td>
                      <td>
                        <Field type="text" name="email" required></Field>
                      </td>
                    </tr>
                    <tr>
                      <td>ngày sinh: </td>
                      <td>
                        <Field type="Date" name="date" required></Field>
                      </td>
                    </tr>
                    <tr>
                      <td> giới tính </td>
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
                    <tr>
                      <td> cmnd </td>
                      <td>
                        <Field
                          type="number"
                          name="identityCode"
                          required
                        ></Field>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
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
            className="btn btn-danger"
          >
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
