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
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CreateCoteModal({open, handleClose, makeReload, maxId, user}) {

    const [dateOpen, setDateOpen] = useState(new Date());
    const [dateClose, setDateClose] = useState(null);

    const handleSubmitCreate = async (value) => {
        value.account_id = user.id;
        value.code = "C"+(maxId+1)
        if (dateOpen.getFullYear()<2000 || dateOpen.getFullYear()>3000) return toast.warn("Vui lòng nhập năm tạo chuồng trong khoảng 2000-3000")
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
                toast.error("Lỗi khi thêm mới");
            });
    };

    const handleCloseModalCreate = () => {
        setDateOpen(new Date())
        setDateClose(null);
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white"}}>Khởi tạo chuồng nuôi</Modal.Title>
                </Modal.Header>
                <Formik initialValues={{quantity: 0}} onSubmit={handleSubmitCreate} validationSchema={Yup.object(Validate.validateCote())}>
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
                                    {/*    <DemoContainer components={['DatePicker']}>*/}
                                    {/*        <DatePicker label="Basic date picker" />*/}
                                    {/*    </DemoContainer>*/}
                                    {/*</LocalizationProvider>*/}
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>Mã nhân viên:</td>
                                        {user &&
                                        <td><Field name="code" type="hidden"></Field><Field name="account_id" value={user.code} readOnly></Field></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><ErrorMessage name="dateOpen" component={"span"}></ErrorMessage></td>
                                    </tr>
                                    <tr>
                                        <td>Ngày tạo chuồng:</td>
                                        <td><ReactDatePicker selected={dateOpen}  dateFormat="dd-MM-yyyy"
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
                                                             onChange={(date) => setDateClose(date)} dateFormat="dd-MM-yyyy" placeholderText="dd-mm-yyyy" readOnly></ReactDatePicker>
                                            <Field name="dateClose" type="hidden" readOnly></Field></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><ErrorMessage name="quantity" component={"span"} className={"error"} ></ErrorMessage></td>
                                    </tr>
                                    <tr>
                                        <td>Số lượng cá thể:</td>
                                        <td><Field name="quantity" ></Field></td>
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