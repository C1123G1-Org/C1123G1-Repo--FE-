import {useEffect, useState} from "react";
import {Button, Pagination, Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {toast} from "react-toastify";
import CoteService from "../../services/CoteService";
import "./Cote.css";
import CreateCoteModal from "./CreateCoteModal";
import UpdateCoteModal from "./UpdateCoteModal";
import DatePicker from "react-datepicker";
import {Field, Form, Formik} from "formik";

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
    const [search, setSearch] = useState(false);
    const [searchStart, setSearchStart] = useState(null);
    const [searchEnd, setSearchEnd] = useState(null);
    const [selectSearch, setSelectSearch] = useState("open");

    useEffect(() => {
        getAll();
    }, [reload, pageSize, page]);
    const getAll = async () => {
        const coteList = await CoteService.getAll(pageSize, page);
        setCotes(coteList.content);
        setInfoPage(coteList);
        setSearch(false)
    };

    const handleSearch = async (value) => {
        setSearch(true)
        if (value.keyword === "" && searchStart === null && searchEnd === null) {
            setReload(!reload)
            setSearch(false)
        }
        else if (value.keyword === "") {
            // console.log(searchStart)
            if (searchStart === null || searchEnd === null) {
                toast.info("Vui lòng nhập đủ ngày tháng")
                setSearch(false)
            } else if (selectSearch === "open") {
                const coteList = await CoteService.searchOpen(convertoDate(searchStart), convertoDate(searchEnd));
                if (coteList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                setCotes(coteList);
            } else {
                const coteList = await CoteService.searchClose(convertoDate(searchStart), convertoDate(searchEnd));
                if (coteList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                setCotes(coteList);
            }
        } else {
            if (searchStart === null && searchEnd === null) {
                const coteList = await CoteService.searchAccountCode(value.keyword);
                if (coteList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                setCotes(coteList);
            } else if (searchStart === null || searchEnd === null) {
                toast.info("Vui lòng nhập đủ ngày tháng")
                setSearch(false)
            } else if (selectSearch === "open") {
                const coteList = await CoteService.searchOpenAccount(convertoDate(searchStart), convertoDate(searchEnd), value.keyword);
                if (coteList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                setCotes(coteList);
            } else {
                const coteList = await CoteService.searchCloseAccount(convertoDate(searchStart), convertoDate(searchEnd), value.keyword);
                if (coteList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                setCotes(coteList);
            }
        }
    }
    const convertoDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`
        return formattedDate;
    }
    const changePageSize = (event) => {
        setPageSize(event.target.value);
        setPage(0);
        setSelectedRadio("")
        setID(-1);
    }

    const handleNext = async () => {
        if (page !== infoPage.totalPages - 1){
            setPage(page + 1)
            setSelectedRadio("")
            setID(-1);
        }

    };
    const handlePrev = async () => {
        if (page > 0){
            setPage(page - 1)
            setSelectedRadio("")
            setID(-1);
        }
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
        } else setShowUpdate(true);
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
            <Row id={"date"}>
                <Col sm={1}></Col>
                <Col sm={11}>
                    <Row style={{paddingTop: "30px", paddingBottom: "30px"}}>
                        <Col sm={2} style={{textAlign: "right"}}>
                            <DatePicker dateFormat="dd-MM-YYYY" selected={searchStart} placeholderText="Start time"
                                        onChange={(date) => setSearchStart(date)}></DatePicker>
                        </Col>
                        <Col sm={1} style={{width: "6px", padding: "0px", marginTop: "6px"}}>
                            -
                        </Col>
                        <Col sm={2} style={{width: "120px"}}>
                            <DatePicker dateFormat="dd-MM-YYYY" selected={searchEnd} placeholderText="End time"
                                        onChange={(date) => setSearchEnd(date)}></DatePicker>
                        </Col>
                        <Col sm={2} style={{ width: "180px"}}>
                            <select className="date" value={selectSearch}
                                    onChange={(event) => setSelectSearch(event.target.value)}>
                                <option value="open">Ngày tạo chuồng</option>
                                <option value="close">Ngày đóng chuồng</option>
                            </select>
                        </Col>
                        <Col sm={2} style={{}}>
                        </Col>
                        <Col sm={3} style={{}}>
                            <Formik initialValues={{keyword: ""}} onSubmit={handleSearch}>
                                <Form>
                                    <Field name="keyword" placeholder="Mã nhân viên"
                                           style={{width: "115px", margin: "0px"}}/>&nbsp;
                                    <Button variant="secondary" type="submit">Tìm kiếm</Button>
                                </Form>
                            </Formik>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="table-container">
                        <Table striped bordered hover size="sm" style={{textAlign: "center"}}>
                            <thead>
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
                                    <td>{cote.code}</td>
                                    <td>{cote.account.fullName + " (" + cote.account.code + ")"}</td>
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
                    {!search &&
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
                    }
                </Col>
            </Row>
            <Row style={{paddingTop: "10px", paddingBottom: "10px"}}>
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
            <CreateCoteModal open={showCreate} handleClose={handleCloseCreate} makeReload={makeReload}/>
            <UpdateCoteModal open={showUpdate} handleClose={handleCloseUpdate} id={id} form={form}
                             dateCloseUpdate={dateCloseUpdate} dateOpenUpdate={dateOpenUpdate}
                             setOpen={setOpenUpdate} setClose={setCloseUpdate} makeReload={makeReload}/>
        </>
    );
}

export default CotesList;
