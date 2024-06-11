import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import * as PostService from "../../../services/PostsServices";
import {toast} from "react-toastify";
import * as Yup from "yup";
import * as React from "react";
import Validate from "./ValidatePost";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "./Firebase";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

export default function CreatePostModal({handleOpen, handleClose, makeReload}) {
    const [selectedRadio, setSelectedRadio] = useState("Hiển thị");
    const [imageUpload, setImageUpload] = useState(null);
    // const [imageListURL, setImageListURL] = useState([]);
    const [urlImage, setUrlImage] = useState("");
    const [data, setData] = useState("")


    const handleChange =async (event)=>{
        await setImageUpload(event.target.files[0]);
        setUrlImage(URL.createObjectURL(event.target.files[0]));
    }

    const handleSubmitCreate = async (value) => {
        if (urlImage === "") {
            toast.warn("Vui lòng upload file trước khi thêm mới!")
            return;
        }
        const imageRef = ref(storage, `anh/${imageUpload.name +v4()}`);
        const snapshot = await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(snapshot.ref);
        value.status = selectedRadio;
        value.postDate = new Date()
        value.accountId = 1
        value.image = url;
        value.content = data;
        // console.log(value)
            PostService.createPost(value)
                .then((res) => {
                    toast.success("Thêm mới thành công");
                    makeReload();
                    handleClose();
                    setImageUpload(null);
                    setUrlImage("");
                    setData("");
                })
                .catch((err) => {
                    toast.error("Lỗi khi thêm mới");
                });
    };

    const handleCloseCreate= ()=>{
        setImageUpload(null);
        setUrlImage("");
        setData("");
        handleClose();
    }
    const handleRadioChange = async (event) => {
        setSelectedRadio(event.target.value);
    };

    return (
        <>
            <Modal show={handleOpen} size="lg" style={{marginTop: "50px"}}>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white", textAlign: "center"}}>Tạo mới tin tức</Modal.Title>
                </Modal.Header>
                <Formik initialValues={{title: "", content: "", image: ""}} onSubmit={handleSubmitCreate}
                        validationSchema={Yup.object(Validate.validatePost())}>
                    <Form className={"form-post"}>
                        <Modal.Body>
                            <div className={"test"}>
                            <Row>
                                {/*<Col sm={1}></Col>*/}
                                <Col>
                                    <Row style={{whiteSpace: "nowrap"}}>
                                        Tiêu đề: &nbsp; <ErrorMessage name="title" component={"span"}
                                                                      className={"error1"}/>
                                    </Row>
                                    <Row>
                                        <Field as="textarea" name="title"></Field>
                                    </Row>
                                    <br></br>
                                    <Row style={{whiteSpace: "nowrap"}}>
                                        Nội dung:&nbsp;
                                    </Row>
                                    <div className={"teste"}>
                                        <Row style={{}} className={"editor"}>
                                            <CKEditor style={{}}
                                                      editor={Editor}
                                                      data="<p>Hello from Nông Trại thiên đường</p>"
                                                      onReady={editor => {
                                                          // You can store the "editor" and use when it is needed.
                                                          console.log('Editor is ready to use!', editor);
                                                      }}
                                                      onChange={(event, editor) => {
                                                          setData(editor.getData());
                                                          console.log({event, editor, data})
                                                      }}
                                            />
                                        </Row>
                                    </div>
                                        <br></br>
                                        <Row style={{whiteSpace: "nowrap"}}>
                                            Chọn hình ảnh: &nbsp;
                                            <input className={"file"}
                                                   style={{width: "270px", border: "none"}}
                                                   multiple
                                                   type="file"
                                                   onChange={handleChange}
                                            />
                                        </Row>
                                        <Row>
                                            <Col style={{}}>
                                                {(urlImage !== "") &&
                                                    <img src={urlImage} width={"120px"} height={"80px"}/>
                                                }
                                            </Col>
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
                                                           handleRadioChange(event)
                                                       }
                                                ></input>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hiển thị:
                                                <input style={{height: "20px", width: "60px"}}
                                                       type="radio"
                                                       value={`Hiển thị`}
                                                       checked={selectedRadio === `Hiển thị`}
                                                       onChange={(event) =>
                                                           handleRadioChange(event)
                                                       }
                                                ></input>
                                            </div>
                                        </Row>
                                </Col>
                                {/*<Col sm={1}></Col>*/}
                            </Row>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Đồng ý
                            </Button>
                            <Button variant="secondary" onClick={handleCloseCreate}>
                                Hủy bỏ
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}