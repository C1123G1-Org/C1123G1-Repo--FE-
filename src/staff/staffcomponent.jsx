import React, { useEffect, useState } from "react";
import { getAllStaff } from "../staffService/StaffService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";

export const StaffComponent = () => {
  const styleTextCenter = { "text-align": "center" };
  const styleLeft50 = { "padding-left": "50px" };
  const styleBorder = { border: "1px solid" };
  const styleTopBot30 = { "padding-top": "30px", "padding-bottom": "30px" };
  const styleTopBot5 = { "padding-top": "5px", "padding-bottom": "5px" };
  const [staff, setStaff] = useState();

  const getAll = () => {
    getAllStaff().then((res) => {
      setStaff(res);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  if (!staff) {
    return <div>loangding...</div>;
  }

  return (
    <>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row style={{ border: "1px solid", height: "40px" }}>
          <Col>
            <div>
              <p></p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={3} style={styleBorder}>
            <div style={styleLeft50}>
              <p>QUẢN LÝ HỆ THỐNG</p>
            </div>
          </Col>
          <Col sm={9} style={styleBorder}>
            <div style={styleLeft50}>
              <p>QUẢN LÝ NHÂN VIÊN</p>
            </div>
          </Col>
        </Row>
        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row style={{ height: "550px" }}>
          <Col sm={3} style={styleBorder}>
            <div>Quản lý nhân viên</div>
            <div>Đăng thông báo</div>
          </Col>
          <Col sm={9} style={styleBorder}>
            <Row>
              <Col sm={2}></Col>
              <Col sm={8}>
                <Row style={styleTopBot30}>
                  <Col>
                    <input size={50}></input>
                  </Col>
                  <Col>
                    <Button variant="secondary">Search</Button>
                  </Col>
                </Row>
              </Col>
              <Col sm={2}></Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover size="sm" style={styleTextCenter}>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>code</th>
                      <th>usename</th>
                      <th>password</th>
                      <th>fullName</th>
                      <th>email</th>
                      <th>gender</th>
                      <th>identityCode</th>
                      <th>status</th>
                      <th>chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((staff, index) => (
                      <tr key={staff.id}>
                        <td>{index + 1}</td>
                        <td>{staff.code}</td>
                        <td>{staff.username}</td>
                        <td>{staff.password}</td>
                        <td>{staff.fullName}</td>
                        <td>{staff.email}</td>
                        <td>{staff.gender}</td>
                        <td>{staff.identityCode}</td>
                        <td>{staff.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row style={styleTopBot30}>
              <Col sm={3}></Col>
              <Col sm={2}>
                <div>
                  <Button>Thêm</Button>
                </div>
              </Col>
              <Col sm={2}>
                <div>
                  <Button>Chỉnh sửa</Button>
                </div>
              </Col>
              <Col sm={2}>
                <div>
                  <Button>Xóa</Button>
                </div>
              </Col>
              <Col sm={3}></Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ border: "1px solid", height: "40px" }}>
          <Col>
            <div>
              <p>Người đăng nhập: admin, Thứ hai, 22/12/2022 9:12:30 AM</p>
            </div>
          </Col>
        </Row>
        {/* Columns are always 50% wide, on mobile and desktop */}
      </Container>
    </>
  );
};
