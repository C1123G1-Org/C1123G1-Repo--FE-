import {useContext, useEffect, useState} from "react";
import {Button, Pagination, Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {toast} from "react-toastify";
import "../../../assets/css/PostManagerment.css";
import {getPostWithPageAndStatus, getPostById} from "../../../services/PostsServices";
import DeletePostModal from "./DeletePostModal";
import CreatePostModal from "./CreatePostModal";
import UpdatePostModal from "./UpdatePostModal";
import {AppContext} from "../../../layouts/AppContext";
// import Cookies from "js-cookie";

function CotesList() {
    const [reload, setReload] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [infoPage, setInfoPage] = useState(false);
    const [status, setStatus] = useState("");
    const [selectedRadio, setSelectedRadio] = useState("");
    const [id, setID] = useState(-1);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [postToUpdate, setPostToUpdate] = useState({});
    // const [userByForm, setUserByForm] = useState({});
    //Sáng nút
    const {setNut1 } = useContext(AppContext);

    useEffect(() => {
        getAllPosts().then();
    }, [reload, page, status]);

    //Sáng nút
    useEffect(() => {
        setNut1(true)
        return () => setNut1(false)
    }, []);

    const getAllPosts = async () => {
        const posts = await getPostWithPageAndStatus(page,status);
        for (let i = 0; i < posts.content.length; i++) {
            // console.log(posts.content[i].postDate)
            posts.content[i].postDate = formatDate(posts.content[i].postDate);
        }
        setPosts(posts.content);
        setInfoPage(posts);
    };

    function formatDate(dateString) {
        let [year, month, day] = dateString.split("-");
        day = day.slice(0,2);
        return `${day}-${month}-${year}`;
    }

    // const convertoDate = (date) => {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, "0");
    //     const day = String(date.getDate()).padStart(2, "0");
    //     return `${year}-${month}-${day}`;
    // };
    const changeStatus = (event) => {
        setStatus(event.target.value);
        setPage(0);
        setSelectedRadio("");
        setID(-1);
    };

    const handleNext = async () => {
        if (page !== infoPage.totalPages - 1) {
            setPage(page + 1);
            setSelectedRadio("");
            setID(-1);
        }
    };
    const handlePrev = async () => {
        if (page > 0) {
            setPage(page - 1);
            setSelectedRadio("");
            setID(-1);
        }
    };
    const makeReload = () => {
        setSelectedRadio("");
        setID(-1);
        setReload(!reload);
    };

    const handleShowCreate = () => {
        setShowCreate(true);
    };
    const handleCloseCreate = () => {
        setShowCreate(false);
    };
    const handleShowUpdate = () => {
        if (id === -1) {
            toast.warn("Bạn chưa chọn chuồng để sửa");
        } else setShowUpdate(true);
    };
    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };

    const handleShowDelete = async () => {
        setShowDelete(true);
    };
    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    const handleRadioChange = async (id, event) => {
        setSelectedRadio(event.target.value);
        setID(id);
        const post = await getPostById(id);
        setPostToUpdate(post);
        // setUserByForm(cote.account)
    };

    const handleChangePoint = async ()=>{
        let post = postToUpdate;
        console.log(post.focalPoint)
        post.focalPoint = !post.focalPoint
        await setPostToUpdate(post);
        await setReload(!reload);
    }

    const handleChangeStatus = async ()=>{
        let post = postToUpdate;
        if (post.status === "Ẩn") post.status = "Hiển thị"
        else post.status = "Ẩn"
        console.log(post.status)
        await setPostToUpdate(post);
        await setReload(!reload);
    }

    return (
        <>
            <Row>
                <Col>
                    <div
                        className="table-post"
                        style={{}}
                    >
                        <Table
                            striped
                            bordered
                            hover
                            size="sm"
                            style={{textAlign: "center"}}
                        >
                            <thead className={"header"}>
                            <tr>
                                <th>STT</th>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tiêu đề bài viết&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                <th>Hình ảnh</th>
                                <th>Ngày đăng bài</th>
                                <th>Trạng thái</th>
                                <th>Tiêu điểm</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.map((post, index) => (
                                <tr key={post.id}>
                                    <td>{index + 1}</td>
                                    <td style={{whiteSpace: "wrap"}}>{post.title}</td>

                                    <td>
                                        <img src={post.image} alt={"..."} width="150" height="100" />
                                    </td>
                                    <td>{post.postDate}</td>
                                    <td>{post.status}</td>
                                    <td>{post.focalPoint === true ? "Có" :"Không"}</td>
                                    <td>
                                        <input
                                            type="radio"
                                            className="radioGroup"
                                            value={`option` + index}
                                            checked={selectedRadio === `option` + index}
                                            onChange={(event) =>
                                                handleRadioChange(post.id, event)
                                            }
                                        ></input>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                    <br></br>
                    {/*{!search && (*/}
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col style={{}}>
                            <Pagination style={{ paddingLeft: "40px"}}>
                                <Pagination.First onClick={handlePrev}/>
                                {infoPage && (
                                    <Pagination.Item>
                                        {page + 1}/{infoPage.totalPages}
                                    </Pagination.Item>
                                )}
                                <Pagination.Last onClick={handleNext}/>
                            </Pagination>
                        </Col>
                        <Col></Col>
                        <Col style={{whiteSpace: "nowrap"}}>
                                Trạng thái:&nbsp;&nbsp;
                                <select
                                    className="my-select"
                                    onChange={changeStatus}
                                >
                                    <option value="">Tất cả</option>
                                    <option value="Hiển thị">Hiển thị</option>
                                    <option value="Ẩn">Ẩn</option>
                                </select>
                        </Col>
                        </Row>
                    {/*)}*/}
                </Col>
            </Row>
            <Row style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <Col sm={7}></Col>
                <Col
                    sm={2}
                    style={{paddingLeft: "120px", width: "230px", marginLeft: "0px"}}
                >
                    <div>
                        <Button onClick={handleShowCreate}>Khởi tạo</Button>
                    </div>
                </Col>
                <Col
                    sm={2}
                    style={{paddingLeft: "5px", width: "127px"}}
                >
                    <div>
                        <Button
                            variant="warning"
                            onClick={handleShowUpdate}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </Col>
                <Col
                    sm={1}
                    style={{paddingLeft: "5px"}}
                >
                    <div>
                        <Button
                            variant="danger"
                            onClick={handleShowDelete}
                        >
                            Xóa
                        </Button>
                    </div>
                </Col>
            </Row>
            <CreatePostModal
                handleOpen={showCreate}
                handleClose={handleCloseCreate}
                makeReload={makeReload}
            />
            <UpdatePostModal
                handleOpen={showUpdate}
                handleClose={handleCloseUpdate}
                form={postToUpdate}
                makeReload={makeReload}
                point = {handleChangePoint}
                status = {handleChangeStatus}
            />
            <DeletePostModal
                handleOpen={showDelete}
                handleClose={handleCloseDelete}
                form={postToUpdate}
                makeReload={makeReload}
            />
        </>
    );
}

export default CotesList;
