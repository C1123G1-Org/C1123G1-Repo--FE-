import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/css/Cote.css";
import CoteService from "../../services/CoteService";
import CreateCoteModal from "./CreateCoteModal";
import ExportCoteModal from "./ExportCoteModal";
import UpdateCoteModal from "./UpdateCoteModal";
import Cookies from "js-cookie";

function CotesList() {
  const [selectedRadio, setSelectedRadio] = useState("");
  const [dateOpenUpdate, setDateOpenUpdate] = useState(null);
  const [dateCloseUpdate, setDateCloseUpdate] = useState(null);
  const [form, setForm] = useState({});
  const [userByForm, setUserByForm] = useState({});
  const [cotes, setCotes] = useState([]);
  const [reload, setReload] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [id, setID] = useState(-1);
  const [pageSize, setPageSize] = useState(5);
  const [infoPage, setInfoPage] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(false);
  const [searchStart, setSearchStart] = useState(null);
  const [searchEnd, setSearchEnd] = useState(null);
  const [selectSearch, setSelectSearch] = useState("open");
  const [maxId, setMaxId] = useState(-1);
  const [dateClose, setDateClose] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAll().then();
  }, [reload, pageSize, page]);

  useEffect(() => {
    getUser().then();
  }, []);

  const getUser = async ()=>{
    const account = await CoteService.getUser(localStorage.getItem("username"))
    setUser(account);
  }
  const getAll = async () => {
    const coteList = await CoteService.getAll(pageSize, page);
    let max = -1;
    for (let i = 0; i < coteList.content.length; i++) {
      if (max < coteList.content[i].id) max = coteList.content[i].id;
      coteList.content[i].dateOpen = formatDate(coteList.content[i].dateOpen);
      if (coteList.content[i].dateClose !== null)
        coteList.content[i].dateClose = formatDate(
          coteList.content[i].dateClose
        );
    }
    setMaxId(max);
    setCotes(coteList.content);
    setInfoPage(coteList);
    setSearch(false);
  };
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  const handleSearch = async (value) => {
    setSearch(true);
    if (value.keyword === "" && searchStart === null && searchEnd === null) {
      setReload(!reload);
      setSearch(false);
    } else if (value.keyword === "") {
      if (searchStart === null || searchEnd === null) {
        toast.info("Vui lòng nhập đủ ngày tháng");
        setSearch(false);
      } else if (selectSearch === "open") {
        if (searchStart < searchEnd) {
          const coteList = await CoteService.searchOpen(
            convertoDate(searchStart),
            convertoDate(searchEnd)
          );
          if (coteList.length === 0)
            toast.info("Không tìm thấy bản ghi phù hợp");
          setCotes(coteList);
        } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc");
      } else {
        if (searchStart < searchEnd) {
          const coteList = await CoteService.searchClose(
            convertoDate(searchStart),
            convertoDate(searchEnd)
          );
          if (coteList.length === 0)
            toast.info("Không tìm thấy bản ghi phù hợp");
          setCotes(coteList);
        } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc");
      }
    } else {
      if (searchStart === null && searchEnd === null) {
        const coteList = await CoteService.searchAccountCode(value.keyword);
        if (coteList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp");
        setCotes(coteList);
      } else if (searchStart === null || searchEnd === null) {
        toast.info("Vui lòng nhập đủ ngày tháng");
        setSearch(false);
      } else if (selectSearch === "open") {
        if (searchStart < searchEnd) {
          const coteList = await CoteService.searchOpenAccount(
            convertoDate(searchStart),
            convertoDate(searchEnd),
            value.keyword
          );
          if (coteList.length === 0)
            toast.info("Không tìm thấy bản ghi phù hợp");
          setCotes(coteList);
        } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc");
      } else {
        if (searchStart < searchEnd) {
          const coteList = await CoteService.searchCloseAccount(
            convertoDate(searchStart),
            convertoDate(searchEnd),
            value.keyword
          );
          if (coteList.length === 0)
            toast.info("Không tìm thấy bản ghi phù hợp");
          setCotes(coteList);
        } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc");
      }
    }
  };
  const convertoDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const changePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
    setSelectedRadio("");
    setID(-1);
  };

  const handleNext = async () => {
    if (page !== infoPage.totalPages - 1) {
      setPage(page + 1);
      setSelectedRadio("");
      setID(-1);
    }
  };
  const handlePrev = async () => {
    if (page > 0) {
      setPage(page - 1);
      setSelectedRadio("");
      setID(-1);
    }
  };
  const makeReload = () => {
    setSelectedRadio("");
    setID(-1);
    setReload(!reload);
  };
  const handleShowExport = async () => {
    if (id === -1) {
      toast.warn("Bạn chưa chọn chuồng để xuất");
    } else if (dateClose !== null) toast.warn("Chuồng bạn chọn đã xuất hết!");
    else {
      const pigList = await CoteService.findPigsByCote(id);
      let pigIll = 0;
      for (let i = 0; i < pigList.length; i++) {
        if (pigList[i].status !== "Khỏe mạnh") pigIll++;
      }
      if (pigIll !== 0) toast.warn(`Chuồng bạn chọn có ${pigIll} con lợn bị bệnh. Vui lòng chuyển lợn bệnh sang chuồng khác trước khi xuất chuồng!`);
      else setShowExport(true);
    }
  };
  const handleCloseExport = () => {
    setShowExport(false);
  };
  const setOpenUpdate = (date) => {
    setDateOpenUpdate(date);
  };
  const setCloseUpdate = (date) => {
    setDateCloseUpdate(date);
  };
  const handleShowCreate = () => {
    setShowCreate(true);
  };
  const handleCloseCreate = () => {
    setShowCreate(false);
  };
  const handleShowUpdate = () => {
    if (id === -1) {
      toast.warn("Bạn chưa chọn chuồng để sửa");
    } else setShowUpdate(true);
  };
  const handleShowDetail = () => {
    if (id === -1) {
      toast.warn("Bạn chưa chọn chuồng để xem");
    } else if (dateClose !== null)
      toast.warn("Chuồng bạn chọn đã đóng. Không còn lợn để xem!");
    else navigate("/admin/cotes/detail/" + id);
  };
  const handleCloseUpdate = () => {
    setDateOpenUpdate(form.dateOpen);
    setDateCloseUpdate(form.dateClose);
    setShowUpdate(false);
  };

  const handleRadioChange = async (id, date, event) => {
    setDateClose(date);
    setSelectedRadio(event.target.value);
    setID(id);
    const cote = await CoteService.findByID(id);
    if (cote.dateClose === null) cote.dateClose = "";
    setForm(cote);
    setUserByForm(cote.account)
    setDateOpenUpdate(cote.dateOpen);
    setDateCloseUpdate(cote.dateClose);
  };

  const handleClickLink = (event, date, username) => {
    if (Cookies.get("role") === "ROLE_ADMIN" || (Cookies.get("role") === "ROLE_NV"
        && localStorage.getItem("username") === username)) {
      if (date !== null) {
        toast.warn("Chuồng bạn chọn đã đóng. Không còn lợn để xem!");
        event.preventDefault(); // Dừng hành động chuyển trang của thẻ <Link>
      }
    }else {
      toast.error("Bạn không có quyền truy cập vào chuồng của người khác")
      event.preventDefault();
    }
  };

  return (
    <>
      <Row id={"date"}>
        <Col sm={3}></Col>
        <Col
          sm={9}
          style={{ paddingLeft: "0px" }}
        >
          <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Col
              sm={2}
              style={{ textAlign: "right", marginLeft: "37px" }}
            >
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={searchStart}
                placeholderText="Ngày bắt đầu"
                onChange={(date) => setSearchStart(date)}
              ></DatePicker>
            </Col>
            <Col
              sm={1}
              style={{ width: "6px", padding: "0px", marginTop: "6px" }}
            >
              -
            </Col>
            <Col
              sm={2}
              style={{ width: "120px" }}
            >
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={searchEnd}
                placeholderText="Ngày kết thúc"
                onChange={(date) => setSearchEnd(date)}
                style={{ width: "120px" }}
              ></DatePicker>
            </Col>
            <Col
              sm={2}
              style={{ width: "180px", paddingLeft: "30px" }}
            >
              <select
                className="date"
                value={selectSearch}
                onChange={(event) => setSelectSearch(event.target.value)}
              >
                <option value="open">Ngày tạo chuồng</option>
                <option value="close">Ngày đóng chuồng</option>
              </select>
            </Col>
            <Col
              sm={5}
              style={{ paddingLeft: "30px", width: "300px" }}
            >
              <Formik
                initialValues={{ keyword: "" }}
                onSubmit={handleSearch}
              >
                <Form>
                  <Field
                    name="keyword"
                    placeholder="Mã nhân viên"
                    style={{ width: "120px", margin: "0px" }}
                  />
                  &nbsp;
                  <Button
                    variant="secondary"
                    type="submit"
                    style={{ marginLeft: "30px" }}
                  >
                    Tìm kiếm
                  </Button>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            className="table-container"
            style={{}}
          >
            <Table
              striped
              bordered
              hover
              size="sm"
              style={{ textAlign: "center" }}
            >
              <thead className={"header"}>
                <tr>
                  <th>STT</th>
                  <th>Mã chuồng nuôi</th>
                  <th>Nhân viên</th>
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
                    <td>
                      <Link
                        to={"/admin/cotes/detail/" + cote.id}
                        style={{ textDecoration: "none" }}
                        onClick={(event)=> handleClickLink(event,cote.dateClose,cote.account.username)}
                      >
                        {cote.code}
                      </Link>
                    </td>

                    <td>
                      {cote.account.fullName + " (" + cote.account.code + ")"}
                    </td>
                    <td>{cote.dateOpen}</td>
                    {/*<td>{cote.dateClose ? cote.dateClose : "Chưa cập nhật"}</td>*/}
                    {cote.dateClose ? (
                      <td style={{ color: "red" }}>{cote.dateClose}</td>
                    ) : (
                      <td>Chưa cập nhật</td>
                    )}
                    <td>{cote.quantity}</td>
                    <td>
                      {(Cookies.get("role") === "ROLE_ADMIN" || (Cookies.get("role") === "ROLE_NV"
                          && localStorage.getItem("username") === cote.account.username)) ?
                      <input
                        type="radio"
                        className="radioGroup"
                        value={`option` + index}
                        checked={selectedRadio === `option` + index}
                        onChange={(event) =>
                          handleRadioChange(cote.id, cote.dateClose, event)
                        }
                      ></input>
                          :
                          <input type={"radio"} disabled></input>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <br></br>
          {!search && (
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col style={{ whiteSpace: "nowrap" }}>
                {/*<label >*/}
                Số lượng bản ghi:&nbsp;&nbsp;
                {/*</label>*/}
                <select
                  className="my-select"
                  value={pageSize}
                  onChange={changePageSize}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </Col>
              <Col>
                <Pagination>
                  <Pagination.First onClick={handlePrev} />
                  {infoPage && (
                    <Pagination.Item>
                      {page + 1}/{infoPage.totalPages}
                    </Pagination.Item>
                  )}
                  <Pagination.Last onClick={handleNext} />
                </Pagination>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <Col sm={5}></Col>
        <Col
          sm={2}
          style={{ paddingLeft: "120px", width: "230px", marginLeft: "22px" }}
        >
          <div>
            <Button onClick={handleShowCreate}>Khởi tạo</Button>
          </div>
        </Col>
        <Col
          sm={2}
          style={{ paddingLeft: "5px", width: "127px" }}
        >
          <div>
            <Button
              variant="warning"
              onClick={handleShowUpdate}
            >
              Chỉnh sửa
            </Button>
          </div>
        </Col>
        <Col
          sm={1}
          style={{ paddingLeft: "5px" }}
        >
          <div>
            <Button
              variant="success"
              onClick={handleShowDetail}
            >
              Chi tiết
            </Button>
          </div>
        </Col>
        <Col
          sm={2}
          style={{ width: "140px", }}
        >
          <div>
            <Button
              variant="info"
              onClick={handleShowExport}
            >
              Xuất chuồng
            </Button>
          </div>
        </Col>
      </Row>
      <CreateCoteModal
          user={user}
        open={showCreate}
        handleClose={handleCloseCreate}
        makeReload={makeReload}
        maxId={maxId}
      />
      <UpdateCoteModal
        open={showUpdate}
        handleClose={handleCloseUpdate}
        id={id}
        form={form}
        dateCloseUpdate={dateCloseUpdate}
        dateOpenUpdate={dateOpenUpdate}
        setOpen={setOpenUpdate}
        setClose={setCloseUpdate}
        makeReload={makeReload}
      />
      <ExportCoteModal
        open={showExport}
        handleClose={handleCloseExport}
        makeReload={makeReload}
        form={form}
        userExport={userByForm}
      />
    </>
  );
}

export default CotesList;
