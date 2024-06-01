import {Button, Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import {useState} from "react";
import CoteService from "../../service/CoteService";
import {toast} from "react-toastify";

export default function CreateCoteModal({open, handleClose, makeReload}){

    const [dateOpen, setDateOpen] = useState(new Date());
    const [dateClose, setDateClose] = useState(null);

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
                setDateOpen(new Date());
                setDateClose(null);
                makeReload();
                handleCloseModalCreate()
            })
            .catch((err) => {
                toast.error("Trùng id rồi");
            });
    };

    const handleCloseModalCreate = () => {
        setDateClose(null);
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header >
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
                                    <Field name="quantity" value={0}></Field>
                                    <br></br>
                                </Col>
                                <Col sm={1}></Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Khởi tạo
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModalCreate} >
                                Hủy bỏ
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}