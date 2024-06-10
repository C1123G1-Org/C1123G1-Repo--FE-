import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import * as services from "../../services/StaffService";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";

export const StaffDelete = ({ closeModal, id, showDelete }) => {
  const [staff, setStaff] = useState();

  const getStaff = async () => {
    try {
      const res = await services.findByID(id);
      setStaff(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    services.removeStaff(staff.id).then((res) => {
      toast.success("xóa thành công");
      closeModal();
    });
  };
  useEffect(() => {
    console.log(`staff: ${staff}`);
    console.log(id);
  }, [id, staff]);

  useEffect(() => {
    getStaff();
  }, [showDelete, id]);

  if (!staff) {
    return <div></div>;
  }
  return (
    <div>
      <Modal show={showDelete} className="vivi">
        <ModalHeader>wanning!</ModalHeader>
        <ModalBody>
          <Formik>
            <Form>
              <p>bạn có muốn xóa không</p>
            </Form>
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleDelete} variant="warning">
            xóa
          </Button>{" "}
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
