import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Modal, Table } from "react-bootstrap";
import CoteService from "./service/CoteService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import "./service/Cote.css";
import ReactDatePicker from "react-datepicker";

function ShowCotesList() {
  const [selectedRadio, setSelectedRadio] = useState('')
  const [dateOpen, setDateOpen] = useState(new Date());
  const [dateOpenUpdate, setDateOpenUpdate] = useState();
  const [dateClose, setDateClose] = useState();
  const [dateCloseUpdate, setDateCloseUpdate] = useState();
  const [form, setForm] = useState({});
  const [cotes, setCotes] = useState([]);
  const [reload, setReload] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [id, setID] = useState(-1);
  const styleTextCenter = { textAlign: "center" };
  const styleLeft50 = { paddingLeft: "50px" };
  const styleBorder = { border: "1px solid" };
  const styleTopBot30 = { paddingTop: "30px", paddingBottom: "30px" };
  // const styleTopBot5 = {'padding-top': '5px', 'padding-bottom': '5px'}

  useEffect(() => {
    getAll();
  }, [reload]);
  const getAll = async () => {
    const coteList = await CoteService.getAll();
    setCotes(coteList.content);
  };

  const handleShow = () => {
    setShowCreate(true);
  };
  const handleShowUpdate = () => {
    if(id == -1){
      toast.warn("Bạn chưa chọn chuồng để sửa")
    }
    else setShowUpdate(true);
  };

  const handleClose = () => {
    setShowCreate(false);
    setDateOpen(new Date());
    setDateClose(null);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  const handleSubmitCreate = async (value) => {
    value.account = {
      "id": 1,
      "code": "NV1",
      "username": "a",
      "password": null,
      "fullName": null,
      "email": null,
      "gender": true,
      "identityCode": "2",
      "status": false
  };
  value.dateOpen = dateOpen;
  value.dateClose = dateClose;
    CoteService.createCote(value)
      .then((res) => {
        toast.success("Thêm mới thành công");
        setDateOpen(null);
        setDateClose(null);
        setShowCreate(false);
        setReload(!reload)
      })
      .catch((err) => {
        toast.error("Trùng id rồi");
      });
  };

  const handleSubmitUpdate = async (value) => {
    value.account = {
      "id": 1,
      "code": "NV1",
      "username": "a",
      "password": null,
      "fullName": null,
      "email": null,
      "gender": true,
      "identityCode": "2",
      "status": false
  };
  value.dateOpen = dateOpenUpdate;
  value.dateClose = dateCloseUpdate;
    CoteService.updateCote(value,id)
      .then((res) => {
        toast.success("Chỉnh sửa thành công");
        setShowUpdate(false);
        setReload(!reload)
      })
      .catch((err) => {
        toast.error("Chỉnh sửa thất bại");
      });
  };

  const handleRadioChange = async(id, event)=>{
    setSelectedRadio(event.target.value)
    setID(id);
    const cote = await CoteService.findByID(id);
    setForm(cote)
    setDateOpenUpdate(cote.dateOpen)
    setDateCloseUpdate(cote.dateClose)
  }


  return (
    <>
      <Modal show={showCreate} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Khởi tạo chuồng nuôi</Modal.Title>
        </Modal.Header>

        <Formik initialValues={{}} onSubmit={handleSubmitCreate}>
          <Form>
            <Modal.Body>
              <Row>
                <Col sm={1}></Col>
                <Col>
                  <label>Mã chuồng nuôi:</label>
                  <br></br>
                  <label>Mã nhân viên:</label>
                  <br></br>
                  <label>Ngày tạo chuồng:</label>
                  <br></br>
                  <label>Ngày đóng chuồng:</label>
                  <br></br>
                  <label>Số lượng cá thể:</label>
                  <br></br>
                </Col>
                <Col>
                  <Field name="code"></Field>
                  <br></br>
                  <Field name="account" value= "NV1"></Field>
                  <br></br>
                  <ReactDatePicker selected={dateOpen} onChange={(date) => setDateOpen(date)}></ReactDatePicker>
                  <Field name="dateOpen" type="hidden"></Field>
                  <br></br>
                  <ReactDatePicker selected={dateClose} onChange={(date) => setDateClose(date)}></ReactDatePicker>
                  <Field name="dateClose" type="hidden"></Field>
                  <br></br>
                  <Field name="quantity"></Field>
                  <br></br>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Khởi tạo
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Hủy bỏ
              </Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Khởi tạo chuồng nuôi</Modal.Title>
        </Modal.Header>

        <Formik initialValues={form} onSubmit={handleSubmitUpdate}>
          <Form>
            <Modal.Body>
              <Row>
                <Col sm={1}></Col>
                <Col>
                  <label>Mã chuồng nuôi:</label>
                  <br></br>
                  <label>Mã nhân viên:</label>
                  <br></br>
                  <label>Ngày tạo chuồng:</label>
                  <br></br>
                  <label>Ngày đóng chuồng:</label>
                  <br></br>
                  <label>Số lượng cá thể:</label>
                  <br></br>
                </Col>
                <Col>
                  <Field name="id" type="hidden"></Field>
                  <Field name="code"></Field>
                  <br></br>
                  <Field name="account" value= "NV1"></Field>
                  <br></br>
                  <ReactDatePicker selected={dateOpenUpdate} onChange={(date) => setDateOpenUpdate(date)}></ReactDatePicker>
                  <Field name="dateOpen" type="hidden"></Field>
                  <br></br>
                  <ReactDatePicker selected={dateCloseUpdate} onChange={(date) => setDateCloseUpdate(date)}></ReactDatePicker>
                  <Field name="dateClose" type="hidden"></Field>
                  <br></br>
                  <Field name="quantity"></Field>
                  <br></br>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Cập nhật
              </Button>
              <Button variant="secondary" onClick={handleCloseUpdate}>
                Hủy bỏ
              </Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
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
              <p>QUẢN LÝ THÔNG TIN ĐÀN</p>
            </div>
          </Col>
          <Col sm={9} style={styleBorder}>
            <div style={styleLeft50}>
              <p>QUẢN LÝ CÁ THỂ</p>
            </div>
          </Col>
        </Row>

        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row style={{ height: "550px" }}>
          <Col sm={3} style={styleBorder}>
            <div>Quản lý cá thể</div>
            <div>Quản lý chuồng nuôi</div>
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
                      <th>STT</th>
                      <th>Mã chuồng nuôi</th>
                      <th>Mã nhân viên</th>
                      <th>Ngày tạo chuồng</th>
                      <th>Ngày đóng chuồng</th>
                      <th>Số lượng cá thể</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cotes.map((cote, index) => (
                      <tr key={cote.id}>
                        <td>{index}</td>
                        <td>{cote.code}</td>
                        <td>{cote.account.code}</td>
                        <td>{cote.dateOpen}</td>
                        <td>{cote.dateClose}</td>
                        <td>{cote.quantity}</td>
                        <td><input type="radio" className="radioGroup" value={`option`+index} checked={selectedRadio === `option`+index}
                        onChange={(event)=> handleRadioChange(cote.id, event)}></input></td>
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
                  <Button onClick={handleShow}>Khởi tạo</Button>
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
}
export default ShowCotesList;
