import { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import CoteService from "../../service/CoteService";
import "./Cote.css";
import CreateCoteModal from "./CreateCoteModal";
import UpdateCoteModal from "./UpdateCoteModal";

function CotesList() {

  const [selectedRadio, setSelectedRadio] = useState('')
  const [dateOpenUpdate, setDateOpenUpdate] = useState(null);
  const [dateCloseUpdate, setDateCloseUpdate] = useState(null);
  const [form, setForm] = useState({});
  const [cotes, setCotes] = useState([]);
  const [reload, setReload] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [id, setID] = useState(-1);
  const [pageSize, setPageSize] = useState(5);
  const [infoPage, setInfoPage] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getAll();
  }, [reload, pageSize, page]);
  const getAll = async () => {
    const coteList = await CoteService.getAll(pageSize, page);
    setCotes(coteList.content);
    setInfoPage(coteList);
  };

  const changePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  }

  const handleNext = async () => {
    if (page !== infoPage.totalPages - 1)
      setPage(page + 1)
  };
  const handlePrev = async () => {
    if (page > 0)
      setPage(page - 1)
  };
  const makeReload = () => {
    setReload(!reload)
  }
  const setOpenUpdate = (date) => {
    setDateOpenUpdate(date)
  }
  const setCloseUpdate = (date) => {
    setDateCloseUpdate(date)
  }
  const handleShowCreate = () => {
    setShowCreate(true);
  };
  const handleCloseCreate = () => {
    setShowCreate(false);
  };
  const handleShowUpdate = () => {
    if (id === -1) {
      toast.warn("Bạn chưa chọn chuồng để sửa")
    }
    else setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  const handleRadioChange = async (id, event) => {
    setSelectedRadio(event.target.value)
    setID(id);
    const cote = await CoteService.findByID(id);
    setForm(cote)
    setDateOpenUpdate(cote.dateOpen)
    setDateCloseUpdate(cote.dateClose)
  }

  return (
    <>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Col>
              <input size={50}></input>
            </Col>
            <Col>
              <Button variant="secondary">Tìm kiếm</Button>
            </Col>
          </Row>
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row>
        <Col>
          <div className="table-container">
            <Table striped bordered hover size="sm" style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã chuồng nuôi</th>
                  <th>Tên nhân viên</th>
                  <th>Ngày tạo chuồng</th>
                  <th>Ngày đóng chuồng</th>
                  <th>Số lượng cá thể</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cotes.map((cote, index) => (
                  <tr key={cote.id}>
                    <td>{index + 1}</td>
                    <td>{cote.code}</td>
                    <td>{cote.account.fullName}</td>
                    <td>{cote.dateOpen}</td>
                    <td>{cote.dateClose ? cote.dateClose : "Chưa cập nhật"}</td>
                    <td>{cote.quantity}</td>
                    <td><input type="radio" className="radioGroup" value={`option` + index}
                      checked={selectedRadio === `option` + index}
                      onChange={(event) => handleRadioChange(cote.id, event)}></input></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <br></br>
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
                <Pagination.First onClick={handlePrev} />
                {infoPage && <Pagination.Item>{page + 1}/{infoPage.totalPages}</Pagination.Item>}
                <Pagination.Last onClick={handleNext} />
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <Col sm={3}></Col>
        <Col sm={2}>
          <div>
            <Button onClick={handleShowCreate}>Khởi tạo</Button>
          </div>
        </Col>
        <Col sm={2}></Col>
        <Col sm={2}>
          <div>
            <Button onClick={handleShowUpdate}>Chỉnh sửa</Button>
          </div>
        </Col>
        <Col sm={3}></Col>
      </Row>
      <CreateCoteModal open={showCreate} handleClose={handleCloseCreate} makeReload={makeReload} />
      <UpdateCoteModal open={showUpdate} handleClose={handleCloseUpdate} id={id} form={form}
        dateCloseUpdate={dateCloseUpdate} dateOpenUpdate={dateOpenUpdate}
        setOpen={setOpenUpdate} setClose={setCloseUpdate} makeReload={makeReload} />
    </>
  );
}
export default CotesList;
