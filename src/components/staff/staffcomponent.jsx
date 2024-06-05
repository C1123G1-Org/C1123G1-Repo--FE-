import React, { useEffect, useState } from "react";
import { getAllStaff } from "../../services/StaffService";
import "./staff.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import { Field, Formik, Form } from "formik";
import { StaffCreate } from "./staffcreate";
import { StaffUpdate } from "./staffupdate";
import * as staffService from "../../services/StaffService";
import { StaffDelete } from "./staffdelete";

export const StaffComponent = () => {
  const [staff, setStaff] = useState();
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState(-1);

  const getAll = () => {
    getAllStaff().then((res) => {
      setStaff(res);
    });
  };

  const handleRadioChange = (id) => {
    setId(id);
  };
  useEffect(() => {
    getAll();
  }, [show, showUpdate, showDelete]);

  if (!staff) {
    return <div>loangding...</div>;
  }

  const closeModal = () => {
    setShow(false);
    setShowUpdate(false);
    setShowDelete(false);
  };

  return (
    <>
      <Row>
        <Col>
          <div className="table-container">
            <Table
              striped
              bordered
              hover
              size="sm"
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Mã Nhân Viên</th>
                  <th>Tên</th>

                  <th>Họ và Tên</th>

                  <th>Giới Tính</th>

                  <th>Ngày Sinh </th>
                  <th>Chọn</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staff, index) => (
                  <tr key={staff.id}>
                    <td>{index + 1}</td>
                    <td>{staff.code}</td>
                    <td>{staff.username}</td>
                    {/* <td>{staff.password}</td> */}
                    <td>{staff.fullName}</td>
                    {/* <td>{staff.email}</td> */}
                    <td>{staff.gender ? <p>Nữ</p> : <p>Nam</p>}</td>
                    {/* <td>{staff.identityCode}</td> */}
                    <td>{staff.date}</td>
                    <td>
                      <td>
                        <input
                          type="radio"
                          className="radioGroup"
                          name="radioVi"
                          value={staff.id}
                          onChange={() => handleRadioChange(staff.id)}
                        ></input>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <br></br>
        </Col>
      </Row>
      <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <Col sm={7}></Col>
        <Col sm={2} style={{ paddingLeft: "120px", width: "230px" }}>
          <div>
            <Button
              onClick={() => {
                setShow(true);
              }}
            >
              Khởi tạo
            </Button>
          </div>
        </Col>
        <Col sm={2} style={{ paddingLeft: "5px", width: "127px" }}>
          <div>
            <Button
              variant="warning"
              onClick={() => {
                setShowUpdate(true);
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        </Col>
        <Col sm={1} style={{ paddingLeft: "5px" }}>
          <div>
            <Button
              variant="success"
              onClick={() => {
                setShowDelete(true);
              }}
            >
              xóa
            </Button>
          </div>
        </Col>
      </Row>
      <StaffCreate show={show} closeModal={closeModal} />
      <StaffUpdate showUpdate={showUpdate} closeModal={closeModal} id={id} />
      <StaffDelete closeModal={closeModal} id={id} showDelete={showDelete} />
    </>
  );
};
