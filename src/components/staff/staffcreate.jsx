import { Formik, Form, Field } from "formik";
import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";

import { toast } from "react-toastify";

import * as staffService from "../../services/StaffService";

export const StaffCreate = ({ show, closeModal }) => {
  useEffect(() => {
    console.log(show);
  }, [show]);

  const handleCreateStaff = async (value) => {
    const res = await staffService.getCreateStaff(value);
    toast.success("thêm mới thành công");
    closeModal();
  };

  return (
    <div>
      <Modal show={show} className="vivi">
        <ModalHeader>Tao moi</ModalHeader>
        <ModalBody>
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
                    <Field type="text" name="code"></Field>
                  </td>
                </tr>
                <tr>
                  <td> họ và tên: </td>
                  <td>
                    <Field type="text" name="fullName"></Field>
                  </td>
                </tr>
                <tr>
                  <td> tên tài khoản: </td>
                  <td>
                    <Field type="text" name="username"></Field>
                  </td>
                </tr>
                <tr>
                  <td> mật khẩu: </td>
                  <td>
                    <Field type="text" name="password"></Field>
                  </td>
                </tr>
                <tr>
                  <td> email: </td>
                  <td>
                    <Field type="text" name="email"></Field>
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
                    <Field type="number" name="identityCode"></Field>
                  </td>
                </tr>
              </table>
              <button type="submit">luu</button>
            </Form>
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              closeModal();
            }}
          >
            Dong
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
