import React, { useEffect, useState } from "react";
import { getAllStaff } from "../../services/StaffService";
import "./staff.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import { Field, Formik, Form } from "formik";
import { StaffCreate } from "./staffcreate";
import { StaffUpdate } from "./staffupdate";
import { StaffDelete } from "./staffdelete";
import ReactPaginate from "react-paginate";
import { Input } from "@mui/material";

export const StaffComponent = () => {
  const [staff, setStaff] = useState();
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState(-1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const getAll = () => {
    getAllStaff(0, search).then((res) => {
      setStaff(res.content);
      setTotalPages(res.totalPages);
    });
  };

  useEffect(() => {
    getAll();
  }, [show, showUpdate, showDelete]);
  // useEffect(() => {
  //   getAll();
  //   console.log("a");
  // }, []);

  const handleRadioChange = (id) => {
    setId(id);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const closeModal = () => {
    setShow(false);
    setShowUpdate(false);
    setShowDelete(false);
  };

  const onHandLeSearch = (e) => {
    e.preventDefault();
    console.log(search);
    getAllStaff(0, search).then((res) => {
      setStaff(res.content);
      setTotalPages(res.totalPages);
    });
  };

  const handlePageClick = (e) => {
    const pageNumber = e.selected;
    setCurrentPage(pageNumber);
    console.log(pageNumber);
    getAllStaff(pageNumber, search).then((res) => {
      setStaff(res.content);
      setTotalPages(res.totalPages);
    });
  };

  if (!staff) {
    return <div>loangding...</div>;
  }

  return (
    <>
      <form action="">
        <input
          placeholder="tên nhân viên"
          style={{ width: "200px", margin: "10px" }}
          type="text"
          onChange={onSearch}
        />
        <button onClick={(e) => onHandLeSearch(e)}>Tìm Kiếm</button>
      </form>

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
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactPaginate
            forcePage={currentPage}
            breakLabel="..."
            nextLabel="Trang Sau"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="Trang Trước"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      )}
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
              variant="danger"
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
