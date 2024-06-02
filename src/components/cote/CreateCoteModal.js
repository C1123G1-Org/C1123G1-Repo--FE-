import {Button, Modal, Table} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import {useState} from "react";
import CoteService from "../../services/CoteService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import Validate from "./Validate";

export default function CreateCoteModal({open, handleClose, makeReload}) {

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
                toast.error("Bạn nhập trùng mã chuồng");
            });
    };

    const handleCloseModalCreate = () => {
        setDateClose(null);
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white"}}>Khởi tạo chuồng nuôi</Modal.Title>
                </Modal.Header>
                <Formik initialValues={{}} onSubmit={handleSubmitCreate} validationSchema={Yup.object(Validate.validateCote())}>
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td></td>
                                        <td ><ErrorMessage name="code" component={"span"} className={"error"} ></ErrorMessage></td>
                                    </tr>
                                    <tr>
                                        <td>Mã chuồng nuôi:</td>
                                        <td><Field name="code"></Field></td>
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
                                        <td><ReactDatePicker selected={dateOpen}  dateFormat="dd-MM-YYYY"
                                                             onChange={(date) => setDateOpen(date)}></ReactDatePicker>
                                            <Field name="dateOpen" type="hidden"></Field></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Ngày đóng chuồng:</td>
                                        <td><ReactDatePicker selected={dateClose}
                                                             onChange={(date) => setDateClose(date)} dateFormat="dd-MM-YYYY" placeholderText="dd-mm-yyyy"></ReactDatePicker>
                                            <Field name="dateClose" type="hidden" ></Field></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><ErrorMessage name="quantity" component={"span"} className={"error"} ></ErrorMessage></td>
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