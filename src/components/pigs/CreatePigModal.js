import {Button, Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import {useState} from "react";
import {toast} from "react-toastify";
import PigService from "../../service/PigService";

export default function CreatePigModal({open, handleClose, makeReload}) {

    const [dateIn, setDateIn] = useState(new Date());
    const [dateOut, setDateOut] = useState(null);

    const handleSubmitCreate = async (value) => {
        value.room = {
            "id": 2,
            "code": "C02",
            "dateOpen": "2024-05-27",
            "dateClose": "2024-05-31",
            "quantity": "0",
            "accountID": "1"
        };
        value.dateIn = dateIn;
        value.dateOut = dateOut;
        PigService.createPig(value)
            .then((res) => {
                toast.success("Thêm mới thành công");
                setDateIn(new Date());
                setDateOut(null);
                makeReload();
                handleCloseModalCreate()
            })
            .catch((err) => {
                toast.error("Trùng id rồi");
            });
    };

    const handleCloseModalCreate = () => {
        setDateOut(null);
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header>
                    <Modal.Title>Khởi tạo cá thể mới</Modal.Title>
                </Modal.Header>

                <Formik initialValues={{}} onSubmit={handleSubmitCreate}>
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    <label>Mã lợn:</label>
                                    <br></br>
                                    <label>Mã chuồng nuôi:</label>
                                    <br></br>
                                    <label>Ngày nhập chuồng:</label>
                                    <br></br>
                                    <label>Ngày xuất chuồng:</label>
                                    <br></br>
                                    <label>Tình trạng:</label>
                                    <br></br>
                                    <label>Cân nặng:</label>
                                    <br></br>
                                </Col>
                                <Col>
                                    <Field name="code"></Field>
                                    <br></br>
                                    <Field name="room" value="C02"></Field>
                                    <br></br>
                                    <ReactDatePicker selected={dateIn}
                                                     onChange={(date) => setDateIn(date)}></ReactDatePicker>
                                    <Field name="dateIn" type="hidden"></Field>
                                    <br></br>
                                    <ReactDatePicker selected={dateOut}
                                                     onChange={(date) => setDateOut(date)}></ReactDatePicker>
                                    <Field name="dateOut" type="hidden"></Field>
                                    <br></br>
                                    <Field name="status"></Field>
                                    <br></br>
                                    <Field name="weight"></Field>
                                    <br></br>
                                </Col>
                                <Col sm={1}></Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Khởi tạo
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModalCreate}>
                                Hủy bỏ
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}