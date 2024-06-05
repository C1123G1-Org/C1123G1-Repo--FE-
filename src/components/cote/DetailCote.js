import {useEffect, useState} from "react";
import {Button, Modal, Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {toast} from "react-toastify";
import CoteService from "../../services/CoteService";
import "./Cote.css";
import {useNavigate, useParams} from "react-router-dom";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import * as React from "react";


function DetailCote() {

    const [reload, setReload] = useState(false);
    const [code,setCode] = useState(false)
    const {id} = useParams()
    const [pigs, setPigs] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [show, setShow] = useState(false);
    const [codesCote, setCodesCote] = useState([]);
    const [selectCodeCote, setSelectCodeCote] = useState("");
    const [selectStatus, setSelectStatus] = useState("All");
    const navigate = useNavigate();



    useEffect(() => {
        getAll().then();
    }, [reload,selectStatus]);

    useEffect(() => {
        getAllCotes().then();
    }, []);

    const getAll = async () => {
        const  cote = await CoteService.findByID(id)
        const pigList = await CoteService.findPigsByCote(cote.code);
        for (let i = 0; i < pigList.length; i++) {
            if (selectStatus === "All")
            pigList[i].dateIn = formatDate(pigList[i].dateIn)
            else if (selectStatus !== pigList[i].status) {
                pigList.splice(i, 1);
                --i;
            }else pigList[i].dateIn = formatDate(pigList[i].dateIn)
        }
        setPigs(pigList)
    };

    const handleStatusChange = (event)=>{
        setSelectStatus(event.target.value);
        setSelectedCheckboxes([])
    }

    const getAllCotes = async () => {
        const  cote = await CoteService.findByID(id)
        const codesCoteList = await CoteService.getCotes()
        for (let i = 0; i < codesCoteList.length; i++) {
            if (codesCoteList[i].id === cote.id)
                codesCoteList.splice(i, 1);
        }
        setCodesCote(codesCoteList)
        setCode(cote.code)
    };

    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    }

   const handleCheckboxChange = async(event) =>{
       const { value, checked } = event.target;
       if (checked) {
           setSelectedCheckboxes([...selectedCheckboxes,value]);
       } else {
           setSelectedCheckboxes(selectedCheckboxes.filter(option => option !== value));
       }
   };
    const handleShowModal = (id) => {
        if (selectedCheckboxes.length === 0) toast.warn("Bạn chưa chọn lợn để chuyển chuồng")
        else
        setShow(true);
    };
    const handleCloseModal = () => {
        setShow(false);
    };

    const handleAcceptModal = () => {
        setShow(false);
        // OrderService.deleteOrder(id)
        //     .then((res) => {
        //         setReload(!reload);
        //         toast.success("xóa thành công");
        //     })
        //     .catch((err) => {
        //         toast.error("xóa thất bại");
        //     });
    };
    const handleComeBack = () =>{
        navigate("/admin/cotes")
    }
    return (
        <>
            <Modal show={show} centered size="lg">
                <Modal.Header style={{backgroundColor: "#1976d2"}} >
                    <Modal.Title style={{color: "white", textAlign:"center"}}>Chuyển đổi chuồng nuôi {code}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={3} style={{}}>
                            <div className="table-container">
                                <Table striped bordered hover size="sm" style={{textAlign: "center"}}>
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã lợn</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedCheckboxes.map((pig, index) => (
                                        <tr key={pig}>
                                            <td>{index + 1}</td>
                                            <td>{pig}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col sm={2} style={{verticalAlign: "middle"}}>

                            <div style={{ textAlign: "center"}}>

                                <DoubleArrowIcon style={{color: "#1976d2",fontSize: "xxx-large"}} />

                            {/*<DoubleArrowIcon style={{color: "#1976d2",fontSize: "xxx-large"}} />*/}
                            </div>

                        </Col>
                        <Col sm={3} style={{}}>
                            <select className="form-select" value={selectCodeCote}
                                    onChange={(event) => setSelectCodeCote(event.target.value)}>
                                {codesCote.map((cote, index) => (
                                    <option key={cote.id} value={cote.code} >Chuồng ({cote.code})</option>
                                ))}
                            </select>
                        </Col>
                        <Col sm={2}></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAcceptModal}>
                        Đồng ý
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                    Hủy bỏ
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row id={"date"}>
                <Col sm={3}></Col>
                <Col sm={6} style={{textAlign:"center"}}>
                    <Row style={{paddingTop: "20px", paddingBottom: "10px",textAlign:"center"}}>
                       <h4 >Danh sách lợn trong chuồng {code}</h4>
                    </Row>
                </Col>
                <Col sm={3}></Col>
            </Row>
            <Row>
                <Col sm={3}></Col>
                <Col sm={3}></Col>
                <Col sm={3}></Col>
                <Col sm={3}>
                    Tình trạng:&nbsp;
                    <select className="form-select" value={selectStatus} style={{width: "140px", display: "inline"}}
                            onChange={handleStatusChange}>
                        <option value="All">Tất cả</option>
                        <option value="Có bệnh">Có bệnh</option>
                        <option value="Khỏe mạnh">Khỏe mạnh</option>
                    </select>
                </Col>
            </Row>
            <Row>&nbsp;</Row>
            <Row>
                <Col>
                    <div className="table-container">
                        <Table striped bordered hover size="sm" style={{textAlign: "center"}}>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã chuồng nuôi</th>
                                <th>Ngày nhập chuồng</th>
                                <th>Ngày xuất chuồng</th>
                                <th>Tình trạng</th>
                                <th>Khối lượng</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {pigs.map((pig, index) => (
                                <tr key={pig.id}>
                                    <td>{index + 1}</td>
                                    <td>{pig.cote.code}</td>
                                    <td>{pig.dateIn}</td>
                                    <td>{pig.dateOut ? pig.dateOut : "Chưa cập nhật"}</td>
                                    <td>{pig.status}</td>
                                    <td>{pig.weight + "kg"}</td>
                                    <td>
                                        <input type={"checkbox"} value={pig.code} className="checboxGroup"
                                               checked={selectedCheckboxes.includes(pig.code)}
                                               onChange={handleCheckboxChange}
                                        ></input>
                                    </td>
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
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                </Col>
            </Row>
            <Row style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <Col sm={8}></Col>
                <Col sm={2} style={{paddingLeft: "5px"}}>
                    <div>
                        <Button onClick={handleShowModal}>Chuyển chuồng</Button>
                    </div>
                </Col>
                <Col sm={2} style={{paddingLeft: "5px"}}>
                    <div>
                        <Button onClick={handleComeBack}>Quay lại</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default DetailCote;
