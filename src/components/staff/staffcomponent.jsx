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
import { DetailStaff } from "./detailstaff";

export const StaffComponent = () => {
  const [staff, setStaff] = useState();
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [id, setId] = useState(-1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const getAll = () => {
    getAllStaff(0, search).then((res) => {
      for (let i = 0; i < res.content.length; i++) {
        res.content[i].date = formatDate(res.content[i].date);
      }
      setStaff(res.content);
      setTotalPages(res.totalPages);
    });
  };

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    getAll();
  }, [show, showUpdate, showDelete, showDetail]);
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
    setShowDetail(false);
  };

  const onHandLeSearch = (e) => {
    e.preventDefault();
    console.log(search);
    getAllStaff(0, search).then((res) => {
      for (let i = 0; i < res.content.length; i++) {
        res.content[i].date = formatDate(res.content[i].date);
      }
      setStaff(res.content);
      setTotalPages(res.totalPages);
    });
  };

  const handlePageClick = (e) => {
    const pageNumber = e.selected;
    setCurrentPage(pageNumber);
    console.log(pageNumber);
    getAllStaff(pageNumber, search).then((res) => {
      for (let i = 0; i < res.content.length; i++) {
        res.content[i].date = formatDate(res.content[i].date);
      }
      setStaff(res.content);
      setTotalPages(res.totalPages);
    });
  };

  if (!staff) {
    return <div>loangding...</div>;
  }

  return (
    <>
      <div className="d-flex">
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div className="col-4">
          <form action="">
            <input
              placeholder="Tên nhân viên"
              style={{
                width: "200px",
                marginLeft: "",
                marginBottom: "10px",
              }}
              type="text"
              onChange={onSearch}
            />
            <button
              className="btn btn-secondary"
              style={{
                marginLeft: "10px",
                color: "white",
              }}
              onClick={(e) => onHandLeSearch(e)}
            >
              Tìm Kiếm
            </button>
          </form>
        </div>
      </div>
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
                  <th>Tên Tài Khoản</th>
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
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="<<"
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
        <Col sm={4}></Col>
        <Col
          sm={2}
          style={{ paddingLeft: "120px", width: "230px", marginLeft: "82px" }}
        >
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
                setShowDetail(true);
              }}
            >
              Chi tiết
            </Button>
          </div>
        </Col>
        <Col sm={2} style={{ paddingLeft: "" }}>
          <div>
            <Button
              variant="danger"
              onClick={() => {
                setShowDelete(true);
              }}
            >
              Xóa
            </Button>
          </div>
        </Col>
      </Row>
      <StaffCreate show={show} closeModal={closeModal} />
      <StaffUpdate showUpdate={showUpdate} closeModal={closeModal} id={id} />
      <DetailStaff showDetail={showDetail} closeModal={closeModal} id={id} />
      <StaffDelete closeModal={closeModal} id={id} showDelete={showDelete} />
    </>
  );
};
