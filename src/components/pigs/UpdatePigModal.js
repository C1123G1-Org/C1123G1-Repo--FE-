import {Button, Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import {toast} from "react-toastify";
import PigService from "../../service/PigService";

export default function UpdatePigModal({
                                            open,
                                            handleClose,
                                            id,
                                            form,
                                            dateOutUpdate,
                                            dateInUpdate,
                                            setIn,
                                            setOut,
                                            makeReload
                                        }) {

    const handleSubmitUpdate = async (value) => {
        value.room = {
            "id": 2,
            "code": "C02",
            "dateOpen": "2024-05-27",
            "dateClose": "2024-05-31",
            "quantity": "0",
            "accountID": "1"
        };
        value.dateIn = dateInUpdate;
        value.dateOut = dateOutUpdate;

        PigService.updatePig(value, id)
            .then((res) => {
                toast.success("Chỉnh sửa thành công");
                makeReload();
            })
            .catch((err) => {
                toast.error("Chỉnh sửa thất bại");
            });
    };

    const handleCloseModalUpdate = () => {
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header>
                    <Modal.Title>Chỉnh sửa thông tin cá thể</Modal.Title>
                </Modal.Header>

                <Formik initialValues={form} onSubmit={handleSubmitUpdate}>
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
                                    <Field name="id" type="hidden"></Field>
                                    <Field name="code"></Field>
                                    <br></br>
                                    <Field name="room" value="C02"></Field>
                                    <br></br>
                                    <ReactDatePicker selected={dateInUpdate}
                                                     onChange={(date) => setIn(date)}></ReactDatePicker>
                                    <Field name="dateIn" type="hidden"></Field>
                                    <br></br>
                                    <ReactDatePicker selected={dateOutUpdate}
                                                     onChange={(date) => setOut(date)}></ReactDatePicker>
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
                                Cập nhật
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModalUpdate}>
                                Hủy bỏ
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}