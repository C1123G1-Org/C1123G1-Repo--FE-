import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Table } from 'react-bootstrap';
import {useEffect, useState} from "react";
// import {Link, NavLink} from "react-router-dom";
import * as pigService from "../../services/PigService"


const ListPig = () => {
    const [pigs, setPigs] = useState([]);
    const [idPicked, setIdPicked] = useState(0);
    const [btnClicked, setBtnClicked] = useState("");
    const handleEach = (idPicking) => {
        setIdPicked(idPicking);
        if (idPicked != 0) {
            if (idPicking == idPicked) {
                document.getElementById(idPicking).style.backgroundColor = 'yellow';
                setIdPicked(0);
            } else {
                // document.getElementsByName(idPicking).style.backgroundColor = 'red';
                // document.getElementsByName(idPicked).style.backgroundColor = 'yellow';
                 document.getElementById(idPicking).style.backgroundColor = 'red';
                document.getElementById(idPicked).style.backgroundColor = 'yellow';
            }
        } else {
            document.getElementById(idPicking).style.backgroundColor = 'red';
        }
    }
    useEffect(() => {
        getAllPig();
        setBtnClicked("");
    }, [btnClicked]);

    const getAllPig = async () => {
        const temp = await pigService.getAllPig();
        setPigs(temp);
    }
    const handleDelete = async (id) => {
        await pigService.deletePig(id);
        setBtnClicked("del");
        setIdPicked(0);
    }

    // useEffect(() => {
    //     getAllPig();

    // }, [idPick]);

    useEffect(() => {
        return () => {
            //     clean up
        }
    }, [])


    const styleTextCenter = {'textAlign': 'center'}
    const styleLeft50 = {'paddingLeft': '50px'}
    const styleBorder = {'border': '1px solid'}
    const styleTopBot30 = {'paddingTop': '30px', 'paddingBottom': '30px'}
    return (
        <>
            <Container >
                {/* Stack the columns on mobile by making one full-width and the other half-width */}
                <Row style={{border: '1px solid', height: '40px'}}>
                    <Col>
                        <div>
                            <p>
                                
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col sm={3} style={styleBorder}>
                    <div style={styleTextCenter}>
                        <p >
                            QUẢN LÝ THÔNG TIN ĐÀN
                        </p>
                    </div>
                    </Col>
                    <Col sm={9} style={styleBorder}>
                        <div style={styleTextCenter}>
                            <p>
                                QUẢN LÝ CÁ THỂ
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row style={{height: '550px'}}>
                    <Col sm={3} style={styleBorder}>
                    <div>
                        Quản lý cá thể
                    </div>
                    <div>
                        Quản lý chuồng nuôi
                    </div>
                    </Col>
                    <Col sm={9} style={styleBorder}>
                    <Row>
                        <Col sm={2}>
                        
                        </Col>
                        <Col sm = {8}>
                            <Row style={styleTopBot30}>
                                <Col lg={6}>
                                    <input size={20}></input>
                                </Col>
                                <Col lg={6}>
                                    <Button variant="secondary">Tìm kiếm</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={2}>
                        
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        {/* striped bordered hover  */}
                            <Table striped bordered hover size="sm" style={styleTextCenter}>
                                <thead>
                                    <tr>
                                    <th>Mã lợn</th>
                                    <th>Mã chuồng nuôi</th>
                                    <th>Ngày nhập chuồng</th>
                                    <th>Ngày xuất chuồng</th>
                                    <th>Tình trạng</th>
                                    <th>Cân nặng (kg)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pigs.map((pig, index) =>
                                        <tr key={pig.id} onClick={() => handleEach(pig.id)} >
                                            <td style={{backgroundColor: 'yellow'}} id={pig.id}>{pig.id}</td>
                                            <td>{pig.room.id}</td>
                                            <td>{pig.dateIn}</td>
                                            <td>{pig.dateOut}</td>
                                            <td>{pig.status}</td>
                                            <td>{pig.weight}</td>
                                            
                                        </tr>
                                    )}
                                </tbody>
                                </Table>
                        </Col>
                    </Row>
                    <Row style={styleTopBot30} >
                        <Col sm={3}>
                        
                        </Col>
                        <Col sm={2} >
                            <div>
                                <Button variant='success'>
                                    Thêm
                                </Button>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div>
                                <Button variant='warning'>
                                    Chỉnh sửa
                                </Button>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div>
                                <Button onClick={() => handleDelete(idPicked)} variant='danger'>
                                    Xóa
                                </Button>
                            </div>
                        </Col>
                        <Col sm={3}>
                        
                        </Col>
                    </Row>
                    </Col>
                </Row>
                <Row style={{border: '1px solid', height: 'auto'}}>
                    <Col  lg={12}>
                        <div>
                            <p>
                                Người đăng nhập: admin, Thứ hai, 22/12/2022 9:12:30 AM
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Columns are always 50% wide, on mobile and desktop */}
                </Container>
        </>
    )
}

export default ListPig;