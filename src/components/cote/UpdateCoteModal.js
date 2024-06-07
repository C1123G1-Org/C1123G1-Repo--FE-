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
            "password": "$2a$12$WedUTeX7g1rc.5TrAXz.B.KQHtBP2OsTCinFwkrzUT5Vtky6mWaP2",
            "fullName": null,
            "email": null,
            "gender": true,
            "identityCode": "2",
            "status": false
        };
        const dateOpen = new Date(dateOpenUpdate);
        if (dateOpen.getFullYear()<2000 || dateOpen.getFullYear()>3000) return toast.warn("Vui lòng nhập năm tạo chuồng trong khoảng 2000-3000")
        if (dateCloseUpdate !== null) {
            const dateClose = new Date(dateCloseUpdate);
            if (dateClose.getFullYear() < 2000 || dateClose.getFullYear() > 3000) return toast.warn("Vui lòng nhập năm đóng chuồng trong khoảng 2000-3000")
            if (dateOpen > dateClose) return toast.warn("Vui lòng nhập ngày tạo chuồng nhỏ hơn ngày đóng chuồng")
        }
        value.dateOpen = dateOpenUpdate;
        value.dateClose = dateCloseUpdate;
        console.log(value)
        CoteService.updateCote(value, id)
            .then((res) => {
                toast.success("Chỉnh sửa thành công");
                makeReload();
            })
            .catch((err) => {
                toast.error("Lỗi khi cập nhật chuồng nuôi");
            });
    };

    const handleCloseModalUpdate = () => {
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white"}}>Chỉnh sửa chuồng nuôi</Modal.Title>
                </Modal.Header>

                <Formik initialValues={form} onSubmit={handleSubmitUpdate} validationSchema={Yup.object(Validate.validateCote())}>
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    <Table className={"update"}>
                                        <tbody>
                                        <tr>
                                            <td>Mã chuồng nuôi:</td>
                                            <td><Field name="id" type="hidden"></Field><Field name="code" readOnly></Field></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Mã nhân viên:</td>
                                            <td><Field name="account.code"  readOnly></Field></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><ErrorMessage name="dateOpen" component={"span"}></ErrorMessage></td>
                                        </tr>
                                        <tr>
                                            <td>Ngày tạo chuồng:</td>
                                            <td><ReactDatePicker selected={dateOpenUpdate}  dateFormat="dd-MM-yyyy"
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
                                                                 onChange={(date) => setClose(date)} dateFormat="dd-MM-yyyy" placeholderText="dd-mm-yyyy"></ReactDatePicker>
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