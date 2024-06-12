import { toast } from 'react-toastify'
import { deleteListContactInfo, getAllContactInfo } from '../../services/ContactInfoService'
import './contactInfoCoponent.css'
import { Button, Modal, Pagination } from 'react-bootstrap'
import { useEffect, useState } from 'react'

export default function ContactInfo(){

    const [page, setPage] = useState(0)
    const [listID, setListId] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [contactInfoList, setContactInfoList] = useState({
        content: []
    })

    useEffect(() => {
        getAllContactInfo(page)
        .then(res => {  
            if(res.data.content.length != 0){
                setContactInfoList(res.data)
            } else {
                if(page != 0){
                    setPage(page - 1)
                } else {
                    setContactInfoList(res.data)
                }
            }
        })
        .catch(e => {
            console.log(e);
            toast.error('Đã xảy ra lỗi')
        })
    }, [page])

    return (
        <>
            <div className="export-table-container">    
                <table border={1} className="export-table">
                    <tr className="export-table__row">
                        <th className="export-table__row--col">Họ tên</th>
                        <th className="export-table__row--col">Email</th>
                        <th className="export-table__row--col">Địa chỉ</th>
                        <th className="export-table__row--col">Số điện thoại</th>
                        <th className="export-table__row--col">Tin nhắn</th>
                        <th className="export-table__row--col">Thời gian</th>
                       
                        <th className="export-table__row--col"></th>
                    </tr>

                    {contactInfoList.content.map(ele => (
                        <tr className="export-table__row">
                            <td className="export-table__row--col">{ele.fullName}</td>
                            <td className="export-table__row--col">{ele.email}</td>
                            <td className="export-table__row--col">{ele.address}</td>
                            <td className="export-table__row--col">{ele.phone}</td>
                            <td className="export-table__row--col">{ele.message}</td>
                            <td className="export-table__row--col">{new Date(ele.time).toLocaleString('vi-VN', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit', 
                                })}</td>
                            
                            <td className="export-table__row--col">
                                <input value={ele.id} type="checkbox" checked={listID.includes(ele.id+'')}  onChange={(e) => {             
                                    if(listID.includes(e.target.value)){
                                        setListId(listID.filter(value => value != e.target.value))
                                    } else {
                                        setListId([...listID, e.target.value])
                                    }
                                }}/>
                            </td>
                        </tr>
                        
                    ))}
                </table>
                {contactInfoList.content.length != 0?
                    <>
                        <div className="show-page-container">
                            <Pagination className="show-page">
                                    <Pagination.First onClick={() => {
                                        if(page != 0){
                                            setPage(page-1)
                                        }
                                    }}/>
                                    <Pagination.Item>{page + 1}/{contactInfoList.totalPages}</Pagination.Item>
                                    <Pagination.Last onClick={()=>{
                                        if(page != contactInfoList.totalPages - 1){
                                            setPage(page+1)
                                        }
                                    }}/>
                            </Pagination>
                        </div>
                        <div className="btn-container">
                            <button className="btn--delete" onClick={() => {setIsShow(true)}}>Xoá</button>
                        </div>
                    </> : null   
                }
               
                <Modal show={isShow} centered onHide={() => {setIsShow(false)}}>
                    <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn thật sự muốn xoá chứ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => {         
                            deleteListContactInfo({idList:listID})
                            .then(res => {
                                setListId([])
                                getAllContactInfo(page)
                                .then(res=>{
                                    if(res.data.content.length != 0){
                                        setContactInfoList(res.data)    
                                    } else {
                                        if(page != 0){
                                            setPage(page - 1)
                                        } else {
                                            setContactInfoList(res.data)  
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
                        
                        setIsShow(false)
                    }}>
                        Đồng ý
                    </Button>
                    <Button variant="primary" onClick={() => {setIsShow(false)}}>
                        Huỷ
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}