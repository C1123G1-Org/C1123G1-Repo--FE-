import React, { useEffect, useState } from "react";
import { getAllStaff } from "../staffService/StaffService";
import "../staff/staff.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import { Field, Formik, Form } from "formik";
import { StaffCreate } from "./staffcreate";
import * as staffService from "../staffService/StaffService";

export const StaffComponent = () => {
  const [staff, setStaff] = useState();
  const [show, setShow] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [form, setForm] = useState({});
  const [id, setID] = useState(-1);

  const getAll = () => {
    getAllStaff().then((res) => {
      setStaff(res);
    });
  };

  useEffect(() => {
    getAll();
  }, [show]);

  useEffect(() => {
    console.log("kk");
    console.log(id);
  }, [id]);

  if (!staff) {
    return <div>loangding...</div>;
  }

  const closeModal = () => {
    setShow(false);
  };

  const handleRadioChange = async (id) => {
    setID(id);
    // const staff = await staffService.findByID(id);
    // setForm(staff);
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
                  <th>code</th>
                  <th>usename</th>
                  {/* <th>password</th> */}
                  <th>fullName</th>
                  {/* <th>email</th> */}
                  <th>gender</th>
                  {/* <th>identityCode</th> */}
                  <th>ngày sinh </th>
                  <th>chọn</th>
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
                          // checked={selectedRadio === `option` + index}
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
          {/* {!search &&
                        <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col>
                                Số lượng bản ghi:&nbsp;&nbsp;
                                <select className="my-select" value={pageSize} onChange={changePageSize}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </Col>
                            <Col>
                                <Pagination>
                                    <Pagination.First onClick={handlePrev}/>
                                    {infoPage && <Pagination.Item>{page + 1}/{infoPage.totalPages}</Pagination.Item>}
                                    <Pagination.Last onClick={handleNext}/>
                                </Pagination>
                            </Col>
                        </Row>
                    } */}
        </Col>
      </Row>
      <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <Col sm={3}></Col>
        <Col sm={2}>
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
        <Col sm={2}></Col>
        <Col sm={2}>
          <div>
            <Button>Chỉnh sửa</Button>
          </div>
        </Col>
        <Col sm={3}></Col>
      </Row>
      {/* <CreateCoteModal open={showCreate} handleClose={handleCloseCreate} makeReload={makeReload}/>
            <UpdateCoteModal open={showUpdate} handleClose={handleCloseUpdate} id={id} form={form}
                             dateCloseUpdate={dateCloseUpdate} dateOpenUpdate={dateOpenUpdate}
                             setOpen={setOpenUpdate} setClose={setCloseUpdate} makeReload={makeReload}/> */}

      <StaffCreate show={show} closeModal={closeModal} />
    </>
  );
};
