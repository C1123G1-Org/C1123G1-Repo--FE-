import {Button, Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import CoteService from "../../service/CoteService";
import {toast} from "react-toastify";

export default function UpdateCoteModal({
                                            open,
                                            handleClose,
                                            id,
                                            form,
                                            dateCloseUpdate,
                                            dateOpenUpdate,
                                            setOpen,
                                            setClose,
                                            makeReload
                                        }) {

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

        CoteService.updateCote(value, id)
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
                                    <Field name="account" value="NV1"></Field>
                                    <br></br>
                                    <ReactDatePicker selected={dateOpenUpdate}
                                                     onChange={(date) => setOpen(date)}></ReactDatePicker>
                                    <Field name="dateOpen" type="hidden"></Field>
                                    <br></br>
                                    <ReactDatePicker selected={dateCloseUpdate}
                                                     onChange={(date) => setClose(date)}></ReactDatePicker>
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