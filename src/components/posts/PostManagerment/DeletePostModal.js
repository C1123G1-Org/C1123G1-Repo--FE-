import {Button, Modal} from "react-bootstrap";
import * as PostService from "../../../services/PostsServices";
import {toast} from "react-toastify";
import * as React from "react";

export default function DeletePostModal({handleOpen, handleClose, form, makeReload}) {

    const handleDelete = async (value) => {
         PostService.deletePost(form.id)
             .then((res) => {
                 toast.success("Xóa thành công");
                 makeReload();
                 handleClose();
             })
             .catch((err) => {
                 toast.error("Lỗi khi xóa bài");
             });
    }

    return(
        <>
            <Modal show={handleOpen} centered>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white", textAlign: "center"}}>Xoá bài tin tức</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"form-post"}>
                        Bạn có đồng ý xóa bài: <br/>"{form.title}" ?<br/> &nbsp;
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDelete}>
                        Đồng ý
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy bỏ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}