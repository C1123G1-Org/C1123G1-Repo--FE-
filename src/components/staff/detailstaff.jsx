import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";

import * as staffService from "../../services/StaffService";
export const DetailStaff = ({ showDetail, closeModal, id }) => {
  const [staff, setStaff] = useState();
  const getStaff = async () => {
    try {
      console.log(`current id: ${id}`);
      const res = await staffService.findByID(id);
      setStaff(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDetail = async (value, id) => {
    const res = await staffService.detailstaff(value, id);
  };
  useEffect(() => {
    console.log(`staff: ${staff}`);
    console.log(id);
  }, [id, staff]);

  useEffect(() => {
    getStaff();
  }, [showDetail, id]);

  if (!staff) {
    return <div>loanding...</div>;
  }

  return (
    <div>
      <Modal show={showDetail} className="vivi vivi3">
        <ModalHeader className="tieude">Chi Tiết Nhân Viên</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={staff}
            onSubmit={(values) => {
              handleDetail(values);
            }}
          >
            <Form>
              <table>
                <tr>
                  <td>Mã Nhân Viên:</td>
                  <td>{staff.code}</td>
                </tr>
                <td></td>
                <tr>
                  <td>Tên Tài Khoản:</td>
                  <td>{staff.username}</td>
                </tr>
                <td></td>
                <tr>
                  <td>Họ và Tên:</td>
                  <td>{staff.fullName}</td>
                </tr>
                <td></td>
                <tr>
                  <td>Email:</td>
                  <td>{staff.email}</td>
                </tr>
                <td></td>
                <tr>
                  <td>Giới Tính:</td>
                  <td>{staff.gender ? <>Nữ</> : <>Nam</>}</td>
                </tr>
                <td></td>
                <tr>
                  <td>Căn cước:</td>
                  <td>{staff.identityCode}</td>
                </tr>
                <td></td>
                <tr>
                  <td>Ngày Sinh :</td>
                  <td>{staff.date}</td>
                </tr>
              </table>
            </Form>
          </Formik>
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
  );
};
