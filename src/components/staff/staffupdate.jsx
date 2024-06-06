import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as service from "../../services/StaffService";
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
    const res = await staffService.getUpdateStaff(value, id);
    toast.success("update thành công.");
    closeModal();
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
  return (
    <div>
      {" "}
      <div>
        <Modal show={showUpdate} className="vivi">
          <ModalHeader>chỉnh sửa</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={staff}
              onSubmit={(values) => {
                handleUpdateStaff(values);
              }}
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
                <button type="submit">sửa</button>
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
    </div>
  );
};
