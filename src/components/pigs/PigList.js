import { useEffect, useState } from "react";
import { Button, Form, Pagination, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import "./Pig.css";
import PigService from "../../service/PigService";
import CreatePigModal from "./CreatePigModal";
import UpdatePigModal from "./UpdatePigModal";
import { Field, Formik } from "formik";

function PigList() {

    const [selectedRadio, setSelectedRadio] = useState('')
    const [dateInUpdate, setDateInUpdate] = useState(null);
    const [dateOutUpdate, setDateOutUpdate] = useState(null);
    const [form, setForm] = useState({});
    const [pigs, setPigs] = useState([]);
    const [reload, setReload] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [id, setID] = useState(-1);
    const [pageSize, setPageSize] = useState(5);
    const [infoPage, setInfoPage] = useState(false);
    const [page, setPage] = useState(0);

  useEffect(() => {
    getAllPig();
  // }, [reload]);
  }, [reload, pageSize, page]);

  const getAllPig = async () => {
    // const pigList = await PigService.getAllPig();
    const pigList = await PigService.getAllPig(pageSize, page);
    setPigs(pigList.content);
    setInfoPage(pigList);
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
  const setInUpdate = (date) => {
    setDateInUpdate(date)
  }
  const setOutUpdate = (date) => {
    setDateOutUpdate(date)
  }
  const handleShowCreate = () => {
    setShowCreate(true);
  };
  const handleCloseCreate = () => {
    setShowCreate(false);
  };

    const handleShowUpdate = () => {
        if (id === -1) {
            toast.warn("Bạn chưa chọn cá thể để sửa")
        } else setShowUpdate(true);
    };
    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };

  const handleRadioChange = async (id, event) => {
    setSelectedRadio(event.target.value)
    setID(id);
    const pig = await PigService.findByID(id);
    setForm(pig)
    setDateInUpdate(pig.dateIn)
    setDateOutUpdate(pig.dateOut)
  }
//   const handleSubmitSearchStatus = async (value) => {
//     PigService.searchPigByStatus(value)
//         .then((res) => {
//           setPigs(PigService.searchPigByStatus(value).content);
//           console.log("123");
//             toast.success("Tìm kiếm thành công");
//         })
//         .catch((err) => {
//             toast.error("Tìm kiếm thất bại");
//         });
// };

  return (
    <>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          {/* <Formik initialValues={form} onSubmit={handleSubmitSearchStatus}>
            <Form> */}
              <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
              <Col>
                <input name="inputStatus" size={50}></input>
              </Col>
              <Col>
                <Button variant="secondary" type="submit">Tìm kiếm</Button>
              </Col>
            </Row>
            {/* </Form>
          </Formik> */}
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
                  <th>Mã Lợn</th>
                  <th>Mã chuồng nuôi</th>
                  <th>Ngày nhập chuồng</th>
                  <th>Ngày xuất chuồng</th>
                  <th>Tình trạng</th>
                  <th>Cân nặng</th>
                  <th>Chọn</th>
                </tr>
              </thead>
              <tbody>
                {pigs.map((pig, index) => (
                  <tr key={pig.id}>
                    <td>{index + 1}</td>
                    <td>{pig.code}</td>
                    <td>{pig.room.code}</td>
                    <td>{pig.dateIn}</td>
                    <td>{pig.dateOut ? pig.dateOut : "Chưa cập nhật"}</td>
                    <td>{pig.status}</td>
                    <td>{pig.weight}</td>
                    <td><input type="radio" className="radioGroup" value={`option` + index}
                      checked={selectedRadio === `option` + index}
                      onChange={(event) => handleRadioChange(pig.id, event)}></input></td>
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
      <CreatePigModal open={showCreate} handleClose={handleCloseCreate} makeReload={makeReload} />
      <UpdatePigModal open={showUpdate} handleClose={handleCloseUpdate} id={id} form={form}
        dateOutUpdate={dateOutUpdate} dateInUpdate={dateInUpdate}
        setIn={setInUpdate} setOut={setOutUpdate} makeReload={makeReload} />
    </>
  );
}

export default PigList;
