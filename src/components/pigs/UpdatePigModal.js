import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import {toast} from "react-toastify";
import PigService from "../../services/PigService";

export default function UpdatePigModal({
                                            open,
                                            handleClose,
                                            id,
                                            form,
                                            dateOutUpdate,
                                            dateInUpdate,
                                            setIn,
                                            setOut,
                                            makeReload,
                                            cote
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
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Mã cá thể</td>
                                                <td><Field name="code" readOnly></Field></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Mã chuồng nuôi</td>
                                                <td>
                                                    <Field as="select" name="roomIndex">
                                                        <option value="">Chọn một tùy chọn</option>
                                                        {cote.map((code, index) => (
                                                            <option value={index} key={code.id}>C{code.id}</option>
                                                        ))} 
                                                    </Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="codeCote" component={"span"}></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Ngày nhập chuồng</td>
                                                <td>
                                                    <ReactDatePicker selected={dateInUpdate} dateFormat="dd-MM-YYYY" placeholderText="dd-mm-yyyy"
                                                        onChange={(date) => setIn(date)} ></ReactDatePicker>
                                                    <Field name="dateIn" type="hidden"></Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="dateIn" component={"span"}></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Ngày xuất chuồng</td>
                                                <td>
                                                    <ReactDatePicker selected={dateOutUpdate} dateFormat="dd-MM-YYYY" placeholderText="dd-mm-yyyy"
                                                        onChange={(date) => setOut(date)}></ReactDatePicker>
                                                    <Field name="dateOut" type="hidden"></Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="dateOut" component={"span"}></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Tình trạng</td>
                                                <td><Field name="status"></Field></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="status" component={"span"} className={"error"} ></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Cân nặng (Kg)</td>
                                                <td>
                                                    {/* <TextareaAutosize></TextareaAutosize> */}
                                                    <Field name="weight"></Field></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="weight" component={"span"} className={"error"} ></ErrorMessage></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                                {/* <Col>
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
                                </Col> */}
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