import {useContext, useEffect, useState} from "react"
// import ReactModal from "react-modal"
import { deleteList, findAll } from "../../services/exportCoteService"
import './exportCoteComponent.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Pagination } from "react-bootstrap"
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {AppContext} from "../../layouts/AppContext";
export default function ExportCote(){

    const [page, setPage] = useState(0)
    const [listID, setListId] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [exportCoteList, setExportCoteList] = useState({
        content: []
    })
    // sáng nút
    const {setNut6 } = useContext(AppContext);

    // Sáng nút
    useEffect(() => {
        setNut6(true)
        return () => setNut6(false)
    }, []);

    useEffect(() => {
        findAll(page)
        .then(res => {  
            if(res.data.content.length != 0){
                setExportCoteList(res.data)
            } else {
                if(page != 0){
                    setPage(page - 1)
                } else {
                    setExportCoteList(res.data)
                }
            }
        })
        .catch(e => {
            toast.error("Đã xảy ra lỗi")
        })
    }, [page])


    const handleClose = () => setIsShow(false);
    const handleShow = () => {
        if (Cookies.get("role") !== "ROLE_ADMIN") toast.error("Bạn không có quyền sử dụng chức năng này!")
        else setIsShow(true);
    }

    return (
        <>
            <div className="export-table-container">    
                <table border={1} className="export-table" style={{whiteSpace: "nowrap"}}>
                    <tr className="export-table__row">
                        <th className="export-table__row--col">Mã</th>
                        <th className="export-table__row--col">Đơn vị xuất</th>
                        <th className="export-table__row--col">Ngày xuất hóa đơn</th>
                        <th className="export-table__row--col">Số lượng (Con)</th>
                        <th className="export-table__row--col">Cân nặng (Kg)</th>
                        <th className="export-table__row--col">Đơn giá (vnd)</th>
                        <th className="export-table__row--col">Tổng tiền (vnd)</th>
                        <th className="export-table__row--col">Nhân viên xuất</th>
                        <th className="export-table__row--col"></th>
                    </tr>

                    {exportCoteList.content.map(ele => (
                        <tr className="export-table__row">
                            <td className="export-table__row--col">{ele.cote.code}</td>
                            <td className="export-table__row--col">{ele.partner}</td>
                            <td className="export-table__row--col">{new Date(ele.dateExport).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}</td>
                            <td className="export-table__row--col">{ele.amount}</td>
                            <td className="export-table__row--col">{ele.weight}</td>
                            <td className="export-table__row--col">{ele.price}</td>
                            <td className="export-table__row--col">{ele.price * ele.weight}</td>
                            <td className="export-table__row--col">{ele.account.fullName}</td>
                            <td className="export-table__row--col">
                                <input value={ele.id} type="checkbox" checked={listID.includes(ele.id + '')}
                                       onChange={(e) => {
                                           if (listID.includes(e.target.value)) {
                                               setListId(listID.filter(value => value != e.target.value))
                                           } else {
                                               setListId([...listID, e.target.value])
                                           }
                                       }}/>
                            </td>
                        </tr>

                    ))}
                </table>
                {exportCoteList.content.length != 0 ?
                    <>
                        <div className="show-page-container">
                            <Pagination className="show-page">
                                    <Pagination.First onClick={() => {
                                        if(page != 0){
                                            setPage(page-1)
                                        }
                                    }}/>
                                    <Pagination.Item>{page + 1}/{exportCoteList.totalPages}</Pagination.Item>
                                    <Pagination.Last onClick={()=>{
                                        if(page != exportCoteList.totalPages - 1){
                                            setPage(page+1)
                                        }
                                    }}/>
                            </Pagination>
                        </div> 
                        <div className="btn-container">
                        <button className="btn--delete" onClick={handleShow}>Xoá</button>
                </div>
                    </>
                    : null
                }
               

                <Modal show={isShow} centered onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn thật sự muốn xoá chứ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => {         
                            deleteList({idList:listID})
                            .then(res => {
                                setListId([])
                                findAll(page)
                                .then(res=>{
                                    if(res.data.content.length != 0){
                                        setExportCoteList(res.data)    
                                    } else {
                                        if(page != 0){
                                            setPage(page - 1)
                                        } else {
                                            setExportCoteList(res.data)  
                                        }    
                                    } 
                                })
                                .catch(er => {
                                    toast.error("Lấy dữ liệu mới thất bại")
                                })
                                toast.success(`Xoá thành công`)
                            })
                            .catch(er => {
                                console.log(er);
                                toast.error('Xoá thất bại')
                            })
                        
                        handleClose()
                    }}>
                        Đồng ý
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Huỷ
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

