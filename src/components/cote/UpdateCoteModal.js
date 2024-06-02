import {Button, Modal, Table} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import CoteService from "../../services/CoteService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import Validate from "./Validate";

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
                toast.error("Bạn nhập trùng mã chuồng");
            });
    };

    const handleCloseModalUpdate = () => {
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white"}}>Khởi tạo chuồng nuôi</Modal.Title>
                </Modal.Header>

                <Formik initialValues={form} onSubmit={handleSubmitUpdate} validationSchema={Yup.object(Validate.validateCote())}>
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    <Table>
                                        <tbody>
                                        <tr>
                                            <td></td>
                                            <td><ErrorMessage name="code" component={"span"} className={"error"}></ErrorMessage></td>
                                        </tr>
                                        <tr>
                                            <td>Mã chuồng nuôi:</td>
                                            <td><Field name="id" type="hidden"></Field><Field name="code"></Field></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Mã nhân viên:</td>
                                            <td><Field name="account" value="NV1" readOnly></Field></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><ErrorMessage name="dateOpen" component={"span"}></ErrorMessage></td>
                                        </tr>
                                        <tr>
                                            <td>Ngày tạo chuồng:</td>
                                            <td><ReactDatePicker selected={dateOpenUpdate}  dateFormat="dd-MM-YYYY"
                                                                 onChange={(date) => setOpen(date)}></ReactDatePicker>
                                                <Field name="dateOpen" type="hidden"></Field></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Ngày đóng chuồng:</td>
                                            <td><ReactDatePicker selected={dateCloseUpdate}
                                                                 onChange={(date) => setClose(date)} dateFormat="dd-MM-YYYY" placeholderText="dd-mm-yyyy"></ReactDatePicker>
                                                <Field name="dateClose" type="hidden" ></Field></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><ErrorMessage name="quantity" component={"span"} className={"error"}></ErrorMessage></td>
                                        </tr>
                                        <tr>
                                            <td>Số lượng cá thể:</td>
                                            <td><Field name="quantity"></Field></td>
                                        </tr>
                                        </tbody>
                                    </Table>
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