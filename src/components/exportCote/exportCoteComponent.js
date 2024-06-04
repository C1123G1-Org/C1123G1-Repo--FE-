import { useEffect, useState } from "react"
import ReactModal from "react-modal"
import { findAll } from "../../service/exportCoteService"
import './exportCoteComponent.css'
import { Link } from "react-router-dom"

export default function ExportCote(){

    const [page, setPage] = useState(0)

    const [exportCoteList, setExportCoteList] = useState({
        content: []
    })

    useEffect(() => {
        findAll(page)
        .then(res => {
            console.log(res);
            setExportCoteList(res.data)
        })
    }, [page])

    return (
        <>
            <ReactModal 
                isOpen={true}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                onRequestClose={true}
            >
                <table border={1} className="export-table">
                    <tr>
                        <th>Mã chuồng</th>
                        <th>Đơn vị xuất</th>
                        <th>Cân nặng</th>
                        <th>Số lượng</th>
                        <th>Ngày xuất biên lai</th>
                        <th>Tổng tiền</th>
                        <th>Nhân viên xuất</th>
                    </tr>

                    {exportCoteList.content.map(ele => (
                        <tr className="export-table__row">
                            <td>{ele.cote.code}</td>
                            <td>{ele.partner}</td>
                            <td>{ele.weight}</td>
                            <td>{ele.amount}</td>
                            <td>{ele.dateExport}</td>
                            <td>{ele.price}</td>
                            <td>{ele.account.fullName}</td>
                        </tr>
                        
                    ))}
                </table>
                <span>{page + 1}|{exportCoteList.totalPages}</span><br/>
                <span>{!exportCoteList.first ? <Link onClick={() => {setPage(page-1)}}>Trang trước
                </Link> : null}   {!exportCoteList.last?<Link onClick={() => {setPage(page +1 )}}>Trang tiếp</Link> : null}</span>
            </ReactModal>
        </>
    )
}