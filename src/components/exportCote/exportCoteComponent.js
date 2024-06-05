import { useEffect, useState } from "react"
import ReactModal from "react-modal"
import { findAll } from "../../services/exportCoteService"
import './exportCoteComponent.css'
import { Link } from "react-router-dom"
import { Pagination } from "react-bootstrap"

export default function ExportCote(){

    const [page, setPage] = useState(0)
    const [listID, setListId] = useState([])

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
            <div className="export-table-container">    
                <table border={1} className="export-table">
                    <tr className="export-table__row">
                        <th className="export-table__row--col">Mã chuồng</th>
                        <th className="export-table__row--col">Đơn vị xuất</th>
                        <th className="export-table__row--col">Cân nặng</th>
                        <th className="export-table__row--col">Số lượng</th>
                        <th className="export-table__row--col">Ngày xuất biên lai</th>
                        <th className="export-table__row--col">Tổng tiền</th>
                        <th className="export-table__row--col">Nhân viên xuất</th>
                        <th className="export-table__row--col"></th>
                    </tr>

                    {exportCoteList.content.map(ele => (
                        <tr className="export-table__row">
                            <td className="export-table__row--col">{ele.cote.code}</td>
                            <td className="export-table__row--col">{ele.partner}</td>
                            <td className="export-table__row--col">{ele.weight}</td>
                            <td className="export-table__row--col">{ele.amount}</td>
                            <td className="export-table__row--col">{ele.dateExport}</td>
                            <td className="export-table__row--col">{ele.price}</td>
                            <td className="export-table__row--col">{ele.account.fullName}</td>
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
                <Pagination className="show-page">
                        <Pagination.First onClick={() => {setPage(page-1)}}/>
                        <Pagination.Item>{page + 1}|{exportCoteList.totalPages}</Pagination.Item>
                        <Pagination.Last onClick={()=>{setPage(page+1)}}/>
                </Pagination>
                <button>Xoá</button>
            </div>
        </>
    )
}