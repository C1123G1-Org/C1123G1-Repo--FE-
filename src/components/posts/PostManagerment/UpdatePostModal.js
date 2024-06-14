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
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "./Firebase";
import {v4} from "uuid";
import {getPostById} from "../../../services/PostsServices";

export default function UpdatePostModal({handleOpen, handleClose,form, makeReload,point,status}) {
    const [selectedRadio, setSelectedRadio] = useState("Hiển thị");
    const [imageUpload, setImageUpload] = useState(null);
    const [urlImage, setUrlImage] = useState("");
    const [data, setData] = useState("")
    const [pointCheck, setPointCheck] = useState(false)
    const [statusCheck, setStatusCheck] = useState(false)


    const handleChange =async (event)=>{
        await setImageUpload(event.target.files[0]);
        setUrlImage(URL.createObjectURL(event.target.files[0]));
        form.image = "";
    }
    const handleSubmitUpdate = async (value) => {
        value.image = form.image;
        if (urlImage !== ""){
            const imageRef = ref(storage, `anh/${imageUpload.name +v4()}`);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            value.image = url;
        }
        if (pointCheck === true) value.focalPoint = !value.focalPoint

        if (statusCheck === true)  {
                    if (value.status === "Ẩn") value.status = "Hiển thị"
                    else value.status = "Ẩn"
                }
        if (data !== "") value.content = data;
        console.log(value)
        PostService.updatePost(form.id,value)
            .then((res) => {
                toast.success("Cập nhật thành công");
                makeReload();
                handleClose();
                setImageUpload(null);
                setUrlImage("");
                setData("");
                setPointCheck(false)
                setStatusCheck(false)
            })
            .catch((err) => {
                toast.error("Lỗi khi Cập nhật");
            });
    };

    const handleCloseUpdate= ()=>{
        setImageUpload(null);
        setUrlImage("");
        setData("");
        handleClose();
        makeReload();
        setPointCheck(false)
        setStatusCheck(false)
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
                <Formik initialValues={form} onSubmit={handleSubmitUpdate}
                        validationSchema={Yup.object(Validate.validatePost())}>
                    <Form className={"form-post"}>
                        <Modal.Body>
                            <div className={"test"}>
                                <Row>
                                    {/*<Col sm={1}></Col>*/}
                                    <Col>
                                        <Row style={{whiteSpace: "nowrap"}}>
                                            <Field name="accountId" type ="hidden"/>
                                            <Field name="postDate" type ="hidden"/>
                                            <Field name="focalPoint" type ="hidden"/>
                                            <Col style={{paddingLeft: "0px",whiteSpace: "nowrap"}} sm={9}>
                                                Tiêu đề: &nbsp; <ErrorMessage name="title" component={"span"}
                                                                              className={"error1"}/>
                                            </Col>
                                            <Col sm={3}>
                                                Tiêu điểm: <input style={{height: "20px", width: "60px"}}
                                                                  type="radio"
                                                                  // value={`Hiển thị`}
                                                                  checked={form.focalPoint}
                                                                  onClick={async (event) => {
                                                                      await point()
                                                                      await setPointCheck(true)
                                                                  }
                                                                  }/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Field as="textarea" name="title"></Field>
                                        </Row>
                                        <br></br>
                                        <Row style={{whiteSpace: "nowrap"}}>
                                            Nội dung:&nbsp;
                                        </Row>
                                        <div className={"update"}>
                                            <Row style={{}} className={"editor"}>
                                                <CKEditor style={{}}
                                                          editor={Editor}
                                                          data={form.content}
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
                                                    <img src={urlImage} width={"120px"} height={"80px"} alt={"..."}/>
                                                }
                                                {(form.image !== "") &&
                                                    <img src={form.image} width={"120px"} height={"80px"} alt={"..."}/>
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
                                                       checked={form.status === `Ẩn`}
                                                       onClick={async (event) => {
                                                           await status()
                                                           await setStatusCheck(true)
                                                       }
                                                       }
                                                ></input>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hiển thị:
                                                <input style={{height: "20px", width: "60px"}}
                                                       type="radio"
                                                       value={`Hiển thị`}
                                                       checked={form.status === `Hiển thị`}
                                                       onClick={async (event) => {
                                                           await status()
                                                           await setStatusCheck(true)
                                                       }
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
                            <Button variant="secondary" onClick={handleCloseUpdate}>
                                Hủy bỏ
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}