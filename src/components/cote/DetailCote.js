import {useEffect, useState} from "react";
import {Button, Modal, Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {toast} from "react-toastify";
import CoteService from "../../services/CoteService";
import "../../assets/css/Cote.css";
import {useNavigate, useParams} from "react-router-dom";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import * as React from "react";


function DetailCote() {

    const [reload, setReload] = useState(false);
    const [cote,setCote] = useState(false)
    const {id} = useParams()
    const [pigs, setPigs] = useState([]);
    const [pigsAll, setPigsAll] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [show, setShow] = useState(false);
    const [coteList, setCoteList] = useState([]);
    const [selectedCote, setSelectedCote] = useState("");
    const [selectStatus, setSelectStatus] = useState("All");
    const [checkAll, setCheckAll] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        getAll().then();
    }, [reload,selectStatus]);

    useEffect(() => {
        getAllCotes().then();
    }, []);

    const getAll = async () => {
        // const  cote = await CoteService.findByID(id)
        const pigList = await CoteService.findPigsByCote(id);
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
        setCheckAll(false)
        setSelectStatus(event.target.value);
        setSelectedCheckboxes([])
    }

    const getAllCotes = async () => {
        const pigList = await CoteService.findPigsByCote(id);
        setPigsAll(pigList)
        const  cote = await CoteService.findByID(id)
        const coteList = await CoteService.getCotes()
        for (let i = 0; i < coteList.length; i++) {
            if (coteList[i].id === cote.id)
                coteList.splice(i, 1);
        }
        setCoteList(coteList)
        setCote(cote)
    };

    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    }

   const handleCheckboxChange = (event) =>{
       const { value, checked } = event.target;
       if (checked) {
           if ((selectedCheckboxes.length + 1) === pigs.length) setCheckAll(true);
           setSelectedCheckboxes([...selectedCheckboxes,value]);
       } else {
           setSelectedCheckboxes(selectedCheckboxes.filter(option => option !== value));
           setCheckAll(false);
       }
   };

    const handleCheckboxAll = (event) =>{
        if (event.target.checked) {
            setCheckAll(true)
            const arrStatus = [];
            for (let i = 0; i < pigs.length; i++) {
                if (selectStatus === "All") {
                    arrStatus.push(pigs[i].code)
                } else if (selectStatus === pigs[i].status) {
                    arrStatus.push(pigs[i].code)
                }
                setSelectedCheckboxes(arrStatus);
            }
        }else {
            setSelectedCheckboxes([]);
            setCheckAll(false)
        }
    }
    const handleShowModal = (id) => {
        if (selectedCheckboxes.length === 0) toast.warn("Bạn chưa chọn lợn để chuyển chuồng")
        else
        setShow(true);
    };
    const handleCloseModal = () => {
        setShow(false);
    };

    const handleAcceptModal = async () => {
        if (selectedCote === "") toast.warning("Bạn chưa chọn chuồng để chuyển!")
        else {
            const pickCote = JSON.parse(selectedCote)
            if ((pickCote.quantity + selectedCheckboxes.length) > 30) toast.error("Tổng số lợn trong chuồng nhận vượt quá 30 con! Vui lòng chọn lại")
            else {
                if (selectedCheckboxes.length === pigsAll.length){
                    CoteService.changeCote({
                        oldCote: cote,
                        newCote: JSON.parse(selectedCote),
                        pigs: selectedCheckboxes
                    }).then((res)=> {
                        toast.success(`Chuyển chuồng thành công`)
                        toast.info(`Bạn đã chuyển hết lợn trong chuồng đi! Chuồng chuyển trạng thái đóng`)
                        setSelectedCheckboxes([]);
                        setSelectedCote("")
                        setReload(!reload);
                        setShow(false);
                    }).catch((err)=> toast.error(`Chuyển chuồng thất bại`))
                }else {
                    CoteService.changeCote({
                        oldCote: cote,
                        newCote: JSON.parse(selectedCote),
                        pigs: selectedCheckboxes
                    }).then((res)=> {
                        toast.success(`Chuyển chuồng thành công`)
                        setSelectedCheckboxes([]);
                        setSelectedCote("")
                        setReload(!reload);
                        setShow(false);
                    }).catch((err)=> toast.error(`Chuyển chuồng thất bại`))
                }
            }
        }
    };
    const handleComeBack = () =>{
        navigate("/admin/cotes")
    }
    return (
        <>
            <Modal show={show} centered size="lg">
                <Modal.Header style={{backgroundColor: "#1976d2"}} >
                    <Modal.Title style={{color: "white", textAlign:"center"}}>Chuyển đổi chuồng nuôi {cote.code}</Modal.Title>
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
                            <select className="form-select" value={selectedCote}
                                    onChange={(event) => setSelectedCote(event.target.value)}>
                                <option value={""} >Chọn chuồng</option>
                                {coteList.map((cote, index) => (
                                    <option key={cote.id} value={JSON.stringify(cote)}>Chuồng ({cote.code})</option>
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
                       <h4 style={{fontWeight: "bold"}}>Danh sách lợn trong chuồng {cote.code}</h4>
                    </Row>
                </Col>
                <Col sm={3}></Col>
            </Row>
            <Row>
                <Col sm={3}></Col>
                <Col sm={3}></Col>
                <Col sm={3}></Col>
                <Col sm={3} style={{whiteSpace: "nowrap"}}>
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
                    <Row>
                        <Col sm={9}></Col>
                        <Col sm={3} style={{paddingRight: "24px", textAlign: "right",whiteSpace: "nowrap"}}>
                            Chọn tất cả: &nbsp;
                            <input type={"checkbox"} className="checboxGroup"
                                   checked={checkAll}
                                   onChange={handleCheckboxAll}
                            ></input>
                        </Col>
                    </Row>
                    <br></br>
                </Col>
            </Row>
            <Row style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <Col sm={8}></Col>
                <Col sm={2} style={{paddingLeft: "5px", marginLeft: "75px", width: "160px"}}>
                    <div>
                        <Button onClick={handleShowModal}>Chuyển chuồng</Button>
                    </div>
                </Col>
                <Col sm={2} style={{paddingLeft: "5px", width: "110px", marginLeft: "5px"}}>
                    <div>
                        <Button variant="secondary" onClick={handleComeBack}>Quay lại</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default DetailCote;
