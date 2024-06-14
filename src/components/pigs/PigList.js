import {useContext, useEffect, useState} from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import "../../assets/css/Pig.css";
import PigService from "../../services/PigService";
import CreatePigModal from "./CreatePigModal";
import UpdatePigModal from "./UpdatePigModal";
import { Field,Form,  Formik } from "formik";
import DatePicker from "react-datepicker";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {AppContext} from "../../layouts/AppContext";
import PigChartList from "./PigChartList";

function PigList() {

    const [selectedRadio, setSelectedRadio] = useState("")
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
    // Create - Update
    const [newPigID, setNewPigID] = useState("");
    const [cote, setCote] = useState([]);
    const [coteAvaiable, setCoteAvaiable] = useState([]);
    // Search
    const [search, setSearch] = useState(false);
    const [searchStart, setSearchStart] = useState(null);
    const [searchEnd, setSearchEnd] = useState(null);
    const [selectSearch, setSelectSearch] = useState("open");
    // const [pigsSearch, setPigsSearch] = useState([]);
    const [sort, setSort] = useState(false);
    // sáng nút
    const {setNut4 } = useContext(AppContext);


    // List Pig
    useEffect(() => {
      getAllPig();
    }, [reload, pageSize, page, newPigID]);

    // Sáng nút
    useEffect(() => {
        setNut4(true)
        return () => setNut4(false)
    }, []);

    const getAllPig = async () => {
      const pigList = await PigService.getAllPig(pageSize, page);
      if (pigList.length === 0) {
        toast.info("Chưa có bản ghi nào tồn tại");
        setNewPigID("L01");
      } else {
        const pigCodeLast = await pigList.content[0].code;
        for (let i = 0; i < pigList.content.length; i++) {
          pigList.content[i].dateIn = formatDate(pigList.content[i].dateIn);
          if (pigList.content[i].dateOut !== null) {
            pigList.content[i].dateOut = formatDate(pigList.content[i].dateOut);
          }
        }
        setPigs(pigList.content);
        if (Number(pigCodeLast.slice(1)) < 9) {
          setNewPigID("L0" + (Number(pigCodeLast.slice(1)) + 1));
        } else if ((Number(pigCodeLast.slice(1)) >= 9)) {
          setNewPigID("L" + (Number(pigCodeLast.slice(1)) + 1));
        }
        setInfoPage(pigList);
        setSearch(false)
      }
    };

    // List Cote
    useEffect(() => {
      getAllCote();
    }, [reload]);

    const getAllCote = async () => {
        const listCote = await PigService.getAllCote();
        setCote(listCote);
    }

    useEffect(() => {
      getAllCoteAvaiable();
    }, [reload]);

    const getAllCoteAvaiable = async () => {
        const listCoteAvaiable = await PigService.getAllCoteAvaiable();
        setCoteAvaiable(listCoteAvaiable);
    }

    // Event
    const changePageSize = (event) => {
      setSort(false);
      setSelectedRadio("")
      setPageSize(event.target.value);
      setPage(0);
    }
    const handleNext = async () => {
      if (page !== infoPage.totalPages - 1) {
        setSelectedRadio("");
        setPage(page + 1)
      }
    };
    const handlePrev = async () => {
      if (page > 0)
        { 
          setSelectedRadio("");
          setPage(page - 1)
        }
    };
    const makeReload = () => {
      setSelectedRadio("")
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
    const convertoDate = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    function formatDate(dateString) {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    }

    // Update
    const handleShowUpdate = () => {
        if (id === -1) {
            toast.warn("Bạn chưa chọn cá thể nào")
        } else {
          setShowUpdate(true);
          setSelectedRadio("");
        };
    };
    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };

    // Change
    const handleRadioChange = async (id, event) => {
      setSelectedRadio(event.target.value)
      setID(id);
      const pig = await PigService.findByID(id);
      setForm(pig)
      setDateInUpdate(pig.dateIn)
      setDateOutUpdate(pig.dateOut)
    }

    // Delete
    const handleDelete = async () => {
      await PigService.deletePig(id);
      setSelectedRadio("")
      setID(-1);
      makeReload();
    }
    
    // Search
    const handleSearch = async (value) => {
      setSearch(true)
      if (value.keyword === "" && searchStart === null && searchEnd === null) {
          setReload(!reload)
          setSearch(false)
      } else if (value.keyword === "") {
          if (searchStart === null || searchEnd === null) {
              toast.info("Vui lòng nhập đủ ngày tháng")
              setSearch(false)
          } else if (selectSearch === "open") {
              if (searchStart < searchEnd) {
                  const pigList = await PigService.searchOpen(convertoDate(searchStart), convertoDate(searchEnd));
                  if (pigList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                  setPigs(pigSearchDateConvert(pigList));
              } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc")
          } else {
              if (searchStart < searchEnd) {
                  const pigList = await PigService.searchClose(convertoDate(searchStart), convertoDate(searchEnd));
                  if (pigList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                    setPigs(pigSearchDateConvert(pigList));
                } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc")
          }
      } else {
          if (searchStart === null && searchEnd === null) {
              // if (searchStart < searchEnd) {
                  const pigList = await PigService.searchCoteCode(value.keyword);
                  if (pigList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                    setPigs(pigSearchDateConvert(pigList));
                // } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc")
          } else if (searchStart === null || searchEnd === null) {
              toast.info("Vui lòng nhập đủ ngày tháng")
              setSearch(false)
          } else if (selectSearch === "open") {
              if (searchStart < searchEnd) {
                  const pigList = await PigService.searchOpenCote(convertoDate(searchStart), convertoDate(searchEnd), value.keyword);
                  if (pigList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                    setPigs(pigSearchDateConvert(pigList));
                } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc")
          } else {
              if (searchStart < searchEnd) {
                  const pigList = await PigService.searchCloseCote(convertoDate(searchStart), convertoDate(searchEnd), value.keyword);
                  if (pigList.length === 0) toast.info("Không tìm thấy bản ghi phù hợp")
                    setPigs(pigSearchDateConvert(pigList));
                } else toast.warn("Vui lòng nhập ngày bắt đầu nhỏ hơn ngày kết thúc")
          }
      }
      
      function pigSearchDateConvert(pigsSearch) {
        for (let i = 0; i < pigsSearch.length; i++) {
          pigsSearch[i].dateIn = formatDate(pigsSearch[i].dateIn);
          if (pigsSearch[i].dateOut !== null) {
            pigsSearch[i].dateOut = formatDate(pigsSearch[i].dateOut);
          }
        }
        return pigsSearch;
      }
      
      // setPigs(pigsSearch);
    }
  
    const handleSortPigWeightUp = async () => {
      setSort(true)
      const arr = await pigs.sort((a,b) => a.weight - b.weight);
      setPigs(arr);
      setSort(false)
    }
    const handleSortPigWeightDown = async () => {
      setSort(true)
      const arr = await pigs.sort((a,b) => b.weight - a.weight);
      setPigs(arr);
      setSort(false)
    }

return (
    <>
        <Row id={"date"}>
        <Col sm={3}></Col>
          <Col sm={5}>
            <Row style={{paddingTop: "30px", paddingBottom: "30px"}}>
              <Col sm={4} style={{textAlign: "right"}}>
                  <DatePicker dateFormat="dd-MM-yyyy" selected={searchStart} placeholderText="Ngày bắt đầu"
                              onChange={(date) => setSearchStart(date)} style={{size: '30px'}}></DatePicker>
              </Col>
              <Col sm={1} style={{width: "6px", padding: "0px", marginTop: "6px"}}>
                  -
              </Col>
              <Col sm={4} style={{width: "120px"}}>
                  <DatePicker dateFormat="dd-MM-yyyy" selected={searchEnd} placeholderText="Ngày kết thúc"
                              onChange={(date) => setSearchEnd(date)}></DatePicker>
              </Col>
              <Col sm={3} style={{width: "180px", paddingLeft: "30px"}}>
                  <select className="date" value={selectSearch}
                          onChange={(event) => setSelectSearch(event.target.value)}>
                      <option value="open">Ngày nhập chuồng</option>
                      <option value="close">Ngày xuất chuồng</option>
                  </select>
              </Col>
            </Row>
          </Col>
          <Col sm={4} style={{paddingLeft: "0px"}}>
                    <Row style={{paddingTop: "30px", paddingBottom: "30px"}}>
                        <Col sm={12} style={{paddingLeft: "30px"}}>
                            <Formik initialValues={{keyword: ""}} onSubmit={handleSearch}>
                                <Form>
                                           <Field as="select" name="keyword" style={{ height: "32px", margin: "0px"}}>
                                                        <option value="" >Chọn mã chuồng</option>
                                                        {cote.map((code, index) => (
                                                            <option value={code.code} key={code.id}>C{code.id}</option>
                                                        ))} 
                                                    </Field>
                                    <Button variant="secondary" type="submit" style={{marginLeft: "30px"}}>Tìm
                                        kiếm</Button>
                                </Form>
                            </Formik>
                        </Col>
                    </Row>
          </Col>
      </Row>
      <Row>
        <Col>
          <div className="table-container">
            <Table striped bordered hover size="sm" style={{ textAlign: "center" }} className={"pig-table"}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã Lợn</th>
                  <th>Mã chuồng nuôi</th>
                  <th>Ngày nhập chuồng</th>
                  <th>Ngày xuất chuồng</th>
                  <th>Tình trạng</th>
                  <th>
                   Cân nặng(Kg)
                    <ArrowDropUpIcon onClick={handleSortPigWeightUp}></ArrowDropUpIcon>
                    <ArrowDropDownIcon onClick={handleSortPigWeightDown}></ArrowDropDownIcon>
                  </th>
                  <th>Chọn</th>
                </tr>
              </thead>
              <tbody>
                {pigs.map((pig, index) => (
                  <tr key={pig.id}>
                    <td>{index + 1}</td>
                    <td>{pig.code}</td>
                    <td>{pig.cote.code}</td>
                    <td>{pig.dateIn}</td>
                    <td>{pig.dateOut ? <span style={{color: "#FFA500"}}>{pig.dateOut}</span> : "Chưa cập nhật"}</td>
                    <td>
                    {pig.status === "Khỏe mạnh" ? <td style={{color: "limegreen"}}>{pig.status}</td> :
                                        <td style={{color: "red"}}>{pig.status}</td>}
                    </td>
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
          {!search && (
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
                <Pagination style={{ paddingLeft: "40px"}}>
                  <Pagination.First onClick={handlePrev} />
                  {infoPage && (
                      <Pagination.Item>
                        {page + 1}/{infoPage.totalPages}
                      </Pagination.Item>
                  )}
                  <Pagination.Last onClick={handleNext} />
                </Pagination>
              </Col>
              <Col></Col>
              <Col style={{ whiteSpace: "nowrap" }}>
                Số lượng bản ghi:&nbsp;&nbsp;
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
            </Row>
          )}
        </Col>
      </Row>
      <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <Col sm={8} lg={8}>
        </Col>
        <Col sm={2} lg={4}>
          <Row>
            <Col sm={12} lg={3}>
              <div style={{ justifyContent:'center', display:'flex', alignItems:'center'}}> 
                <Button onClick={handleShowCreate}>Khởi tạo</Button>
              </div>
            </Col>
            <Col sm={12} lg={6}>
              <div style={{ justifyContent:'center', display:'flex', alignItems:'center'}}> 
                <Button  onClick={handleShowUpdate} variant="warning">Chỉnh sửa</Button>
              </div>
            </Col>
            <Col sm={12} lg={3}>
              <div style={{ justifyContent:'center', display:'flex', alignItems:'center'}}> 
                <Button onClick={() => handleDelete()} variant='danger'>
                      Xóa
                  </Button>
              </div>
            </Col>
          </Row>
        </Col>
        
        {/* <Col sm={3}></Col> */}
      </Row>
      <CreatePigModal coteAvaiable={coteAvaiable} newPigID={newPigID} open={showCreate} handleClose={handleCloseCreate} makeReload={makeReload} />
      <UpdatePigModal coteAvaiable={coteAvaiable} open={showUpdate} handleClose={handleCloseUpdate} id={id} form={form}
        dateOutUpdate={dateOutUpdate} dateInUpdate={dateInUpdate}
        setIn={setInUpdate} setOut={setOutUpdate} makeReload={makeReload} />
    </>
  );
}

export default PigList;
