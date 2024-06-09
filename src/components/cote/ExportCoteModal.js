import {Button, Modal, Table} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import CoteService from "../../services/CoteService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import Validate from "./Validate";


export default function ExportCoteModal({open, handleClose, makeReload, form, userExport}) {

    // const [dateTimeExport, setDateTimeExport] = useState(new Date());

    const handleSubmitExport = async (value) => {
        value.account_id = 1;
        value.cote_id = form.id
        CoteService.updatePigsAfterExportCote(form.code)
            .then((res)=> {
                CoteService.exportCote(value)
                    .then((res) => {
                        toast.success("Xuất chuồng thành công");
                        makeReload();
                        handleClose();
                    })
                    .catch((err) => {
                        toast.error("Lỗi khi xuất chuồng");
                    });
            }).catch((err) => {
            toast.error("Lỗi khi xuất chuồng");
        });
    };

    return (
        <>
            <Modal show={open} centered>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white"}}>Xuất chuồng</Modal.Title>
                </Modal.Header>
                <Formik initialValues={{partner: "", weight: "", price: ""}} onSubmit={handleSubmitExport}
                        validationSchema={Yup.object(Validate.validateExportCote())}>
                    <Form className={"form-cote"}>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    <Table className={"export"}>
                                        <tbody>
                                        <tr>
                                            <td>Mã chuồng:</td>
                                            <td><Field name="cote_id" value={form.code} readOnly></Field></td>
                                        </tr>
                                        <tr>
                                            <td>Nhân viên:</td>
                                            <td><Field name="account_id" value={userExport.code} readOnly></Field></td>
                                        </tr>
                                        <tr>
                                            <td>Đơn vị:</td>
                                            <td><ErrorMessage name="partner" component={"span"}
                                                              className={"error"}></ErrorMessage>
                                                <Field name="partner" placeholder="Đối tác"></Field></td>
                                        </tr>
                                        <tr>
                                            <td>Ngày giờ xuất:</td>
                                            <td><ReactDatePicker selected={new Date()} dateFormat="dd-MM-yyyy"
                                                                 readOnly></ReactDatePicker>
                                                <Field name="dateExport" type="hidden" readOnly></Field></td>
                                        </tr>
                                        <tr>
                                            <td>Số lượng (con):</td>
                                            <td><Field name="amount" type="number" value={form.quantity}
                                                       readOnly></Field></td>
                                        </tr>
                                        <tr>
                                            <td>Tổng số cân (kg):</td>
                                            <td><ErrorMessage name="weight" component={"span"}
                                                              className={"error"}></ErrorMessage>
                                                <Field name="weight" type="number" step="0.01"
                                                       placeholder="Khối lượng"></Field></td>
                                        </tr>
                                        <tr>
                                            <td>Đơn giá (vnd/kg):</td>
                                            <td><ErrorMessage name="price" component={"span"}
                                                              className={"error"}></ErrorMessage>
                                                <Field name="price" type="number" placeholder="vnd"></Field></td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col sm={1}></Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Đồng ý
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Hủy bỏ
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}