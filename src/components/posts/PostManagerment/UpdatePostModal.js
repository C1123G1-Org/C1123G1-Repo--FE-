import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";
import * as PostService from "../../../services/PostsServices";
import {toast} from "react-toastify";
import * as Yup from "yup";
import * as React from "react";
import Validate from "./ValidatePost";

export default function UpdatePostModal({handleOpen, handleClose,form, makeReload}) {
    const [selectedRadio, setSelectedRadio] = useState("Hiển thị");

    const handleSubmitUpdate = async (value) => {
        value.status = selectedRadio;
        // value.postDate = new Date()
        // value.accountId = 1
        // console.log(value)
        PostService.updatePost(form.id,value)
            .then((res) => {
                toast.success("Cập nhật thành công");
                makeReload();
                handleClose();
            })
            .catch((err) => {
                toast.error("Lỗi khi Cập nhật");
            });
    };
    // const handleRadioChange = async (event) => {
    //     setSelectedRadio(event.target.value);
    // };

    return (
        <>
            <Modal show={handleOpen} size="lg" style={{marginTop: "50px"}}>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white", textAlign: "center"}}>Tạo mới tin tức</Modal.Title>
                </Modal.Header>
                <Formik initialValues={form} onSubmit={handleSubmitUpdate}
                        validationSchema={Yup.object(Validate.validatePost())}>
                    <Form className={"form-post"}>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    <Row style={{whiteSpace: "nowrap"}}>
                                        <Field name="accountId" type ="hidden"/>
                                        <Field name="postDate" type ="hidden"/>
                                        Tiêu đề: &nbsp; <ErrorMessage name="title" component={"span"}
                                                                      className={"error1"}/>
                                    </Row>
                                    <Row>
                                        <Field as="textarea" name="title"></Field>
                                    </Row>
                                    <br></br>
                                    <Row style={{whiteSpace: "nowrap"}}>
                                        Nội dung:&nbsp; <ErrorMessage name="content" component={"span"}
                                                                      className={"error1"}/>
                                    </Row>
                                    <Row>
                                        <Field as="textarea" name="content" style={{height: "200px"}}></Field>
                                    </Row>
                                    <br></br>
                                    <Row style={{whiteSpace: "nowrap"}}>
                                        Đường dẫn hình ảnh: &nbsp; <ErrorMessage name="image" component={"span"}
                                                                                 className={"error1"}/>
                                    </Row>
                                    <Row>
                                        <Field name="image" style={{width: "100%"}}></Field>
                                    </Row>
                                    <br></br>
                                    <Row style={{whiteSpace: "nowrap"}}>
                                        Trạng thái:
                                    </Row>
                                    <Row>
                                        <div style={{paddingLeft: "100px"}}>
                                            Ẩn:
                                            <input style={{height: "20px", width: "60px"}}
                                                   type="radio"
                                                   value={`Ẩn`}
                                                   checked={selectedRadio === `Ẩn`}
                                                   onChange={(event) =>
                                                       setSelectedRadio(event.target.value)
                                                   }
                                            ></input>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hiển thị:
                                            <input style={{height: "20px", width: "60px"}}
                                                   type="radio"
                                                   value={`Hiển thị`}
                                                   checked={selectedRadio === `Hiển thị`}
                                                   onChange={(event) =>
                                                       setSelectedRadio(event.target.value)
                                                   }
                                            ></input>
                                        </div>
                                    </Row>
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